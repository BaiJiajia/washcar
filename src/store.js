import Vue from 'vue'
import Vuex from 'vuex'
import $ from "jquery"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    point: null,
    province: null,
    city: null,
    district: null
  },
  mutations: {
      setPosition(state, payload) {
        state.point = {lat: payload.lat, lng: payload.lng}
        state.province = payload.province
        state.city = payload.city
        state.district = payload.district || "全部"
      }
  },
  actions: {
    getBaiduPosition({commit},payload) {
      var url ="https://api.map.baidu.com/geoconv/v1/?coords="+payload.lng+","+payload.lat+"&from=3&to=5&ak=ZmSkRTMZQSnZe90gC0C9XetqQOsKOM7n";
      $.ajax({
        url: url,
        type: 'GET',
        contentType: "application/json",
        dataType: 'jsonp',//这里要用jsonp的方式不然会报错
        success: function(data) {
          payload.lng = data.result[0].x;//经度
          payload.lat  = data.result[0].y;//纬度
          commit("setPosition", payload)
        }
      });
    }
  }
})
