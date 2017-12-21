import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import * as mutations from './mutations'
import * as getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    router
  },
  mutations,
  getters,
  strict: debug,
  state: {
    scores: [],
    character: 'dad'
  }
})
