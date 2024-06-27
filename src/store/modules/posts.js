import shop from '../../api/shop'

// initial state
const state = () => ({
  all: [],
  loaded: false,
})

// getter
const getters = {}

// actions
const actions = {
  async getAllPosts ({ commit }) {
    const posts = await shop.getPosts()
    commit('setPosts', posts)
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
