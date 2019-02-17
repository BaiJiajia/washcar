import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import "lib-flexible/flexible.js";
import './assets/css/reset.css'
import { Search } from 'mint-ui';

Vue.component(Search.name, Search);
Vue.config.productionTip = false
fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
