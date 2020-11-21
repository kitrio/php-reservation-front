const state = {
    memberid: null,
  }
  
  const getters = {
    getMemberId (state) {
      return state.memberid
    }
  }
  
  const mutations = {
    setMemberId (state, payload) {
      state.memberid = payload
    }
  }
  
  const actions = {
    login ({ commit }, payload) {
      commit('setMemberId', payload)
    },
    logout ({ commit }) {
      axios.post('/api/member/logout')
        .then(response => {
          commit('setMemberId', null)
          if(response.status === 200){
            alert('로그아웃 되었습니다.')
            router.push({
              path: '/'
          })
          }
        })
        .catch(error => {
          if (error.response.status === 500) {
            alert('로그아웃이 실패했습니다.')
          }
        })
    }
  }
  import router from '../router/index'
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
  