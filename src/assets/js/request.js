import Axios from "axios";
import Vue from "vue";

// const host = "/api";
const host = "http://one.dydigit.com/xichedian";
const serve = Axios.create({
  // baseURL: '/api'
  baseURL: host,
  timeout: 10000
});
serve.interceptors.response.use(
  res => {
      if(res.status === 200) {
          if(res.data.retCode === 0) {
            return res.data.retContent;
          }
      }
  },
  error => {
    return error;
  }
);

Vue.prototype.$request = (api, query, method = "get") => {
  let uri = api;
  if (method === "get") {
    uri += "?";
    for (let i in query) {
      uri += `${i}=${query[i]}&`;
    }
  }
  return serve({
    url: uri,
    method: method,
    query: method === "get" ? null : query
  });
};
