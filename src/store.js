import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newOrder:null
  },
  mutations: {
    getNewOrder(state,value){
      state.newOrder = value
    }
  },
  actions: {

  }
})
