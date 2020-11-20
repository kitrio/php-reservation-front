const state = {
    memberId: null,
  }
  
  const getters = {
    getMemberId (state) {
      return state.memberId
    }
  }
  
  const mutations = {
    setMemberId (state, payload) {
      state.memberId = payload
    }
  }
  
  const actions = {
    logIn ({ commit }, payload) {
      commit('setMemberId', payload)
    },
    logout ({ commit }) {
      axios.post('/member/logout')
        .then(() => {
          commit('setMemberId', null)
        })
        .catch(() => {
  
        })
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
  