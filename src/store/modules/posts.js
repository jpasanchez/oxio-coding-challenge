import shop from '../../api/shop'

// initial state
const state = () => ({
  all: [],
  loaded: false,
  initialized: false,
})

// getter
const getters = {}

// actions
const actions = {
  async getAllPosts ({ commit }) {
    if (!state.initialized) {
      const posts = await shop.getPosts()
      commit('setPosts', posts)
      state.initialized = true;
    }
  },

  addNewPost ({ state, commit }, post) {
    commit('pushNewPost', post )
  }
}

// mutations
const mutations = {
  setPosts (state, posts) {
    state.all = posts
    state.loaded = true
  },

  pushNewPost (state, post ) {
    state.all.push(post)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
