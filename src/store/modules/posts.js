import shop from '../../api/shop'

// initial state
const state = () => ({
  all: [],
  loaded: false,
})

// getters
const getters = {}

// actions
const actions = {
  async getAllPosts ({ commit }) {
    const posts = await shop.getPosts()
    commit('setPosts', posts)
  }
}

// mutations
const mutations = {
  setPosts (state, posts) {
    state.all = posts
    state.loaded = true
  },

  decrementProductInventory (state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
