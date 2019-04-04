import Vue from 'vue'
import Vuex from 'vuex'

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
        state.point = payload.location
        state.province = payload.ad_info.province
        state.city = payload.ad_info.city
        state.district = payload.ad_info.district
      }
  },
  actions: {

  }
})
