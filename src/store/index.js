import Vue from 'vue'
import Vuex from 'vuex'
import member from './member'
import contents from './contents'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    member,
    contents
  },
  plugins: [
    createPersistedState({
      paths: ['member']
    })
  ]
})
