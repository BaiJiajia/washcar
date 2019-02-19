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
        state.point = payload.point
        state.province = payload.addressComponents.province
        state.city = payload.addressComponents.city
        state.district = payload.addressComponents.district
      }
  },
  actions: {

  }
})
