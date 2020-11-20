import Vue from 'vue'
import Vuex from 'vuex'
import member from './member'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    member
  },
  plugins: [
    createPersistedState({
      paths: ['member']
    })
  ]
})
