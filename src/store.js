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
        state.point = {lat: payload.lat, lng: payload.lng}
        state.province = payload.province
        state.city = payload.city
        state.district = payload.district || "全部"
      }
  },
  actions: {

  }
})
