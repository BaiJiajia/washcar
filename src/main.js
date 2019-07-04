import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import fastclick from "fastclick";
// import "lib-flexible/flexible.js";
<<<<<<< HEAD
import "./assets/css/reset.css";
import { Search, Picker } from "mint-ui";
import "./assets/js/request.js";
import "./assets/js/getPosition.js";
=======
import './assets/css/reset.css'
import { Search, Picker } from 'mint-ui';
import './assets/js/request.js'
import './assets/js/getPosition.js'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
>>>>>>> a062f3c49aabe6cf33f6125b724d2d413dcae43a
// import VConsole from 'vconsole'
import VueLazyload from "vue-lazyload"; //引入这个懒加载插件

Vue.use(VueLazyload);

// 或者添加VueLazyload 选项
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
});
// var vConsole = new VConsole();
Vue.component(Picker.name, Picker);
Vue.component(Search.name, Search);
Vue.config.productionTip = false;
fastclick.attach(document.body);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

document.body.onresize = function() {
  document.body.style.width = `${window.screen.width}px`;
};
