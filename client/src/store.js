import Vue from 'vue'
import Vuex from 'vuex'

import { gql } from 'apollo-boost'
import { defaultClient as apolloClient } from './main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false,
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload
    },
    setLoading: (state, payload) => {
      state.loading = payload
    },
  },
  actions: {
    getPosts: ({ commit }) => {
      // use ApolloClient to fire getPosts query
      commit('setLoading', true)
      apolloClient
        .query({
          query: gql`
            query {
              getPosts {
                _id
                title
                imageUrl
              }
            }
          `,
        })
        .then(({ data }) => {
          /*
           * Get data from actions to state via mutations
           * commit passes data from actions along to mutation functions
           */
          commit('setPosts', data.getPosts)
          commit('setLoading', false)
          console.log(data.getPosts)
        })
        .catch(err => {
          commit('setLoading', false)
          console.error(err)
        })
    },
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading,
  },
})
