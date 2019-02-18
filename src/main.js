import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import "lib-flexible/flexible.js";
import './assets/css/reset.css'
import { Search, Picker } from 'mint-ui';
import AMap from 'AMap'
Vue.use(AMap)

Vue.component(Picker.name, Picker);
Vue.component(Search.name, Search);
Vue.config.productionTip = false
fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
