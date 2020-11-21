const state = {
  content: null
}

const getters = {
  getContent (state) {
    return state.content
  }
}

const mutations = {
  setContent (state, payload) {
    state.content = payload
  }
}

const actions = {
  contentAction ({ commit }, payload) {
    commit('setContent', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
