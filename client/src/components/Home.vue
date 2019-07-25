<template>
  <div class="home">
    <v-layout row wrap>
      <v-dialog v-model="loading" fullscreen persistent>
        <v-container grid-list-xs fill-height>
          <v-layout row wrap justify-center align-center>
            <v-progress-circular
              indeterminate
              :size="70"
              :width="7"
              color="secondary"
            ></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>
    <v-flex xs12>
      <v-carousel
        v-if="!loading && posts.length > 0"
        v-bind="{ cycle: true }"
        interval="3000"
        hide-delimiters
      >
        <v-carousel-item
          @click.native="goToPost(post._id)"
          v-for="post in posts"
          :key="post._id"
          :src="post.imageUrl"
        >
          <h1 class="white--text text-xs-center carousel-title">
            {{ post.title }}
          </h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </div>
</template>

<script>
// import { gql } from "apollo-boost";

import { mapGetters } from "vuex";

export default {
  name: "Home",
  created() {
    this.handleGetPosts();
  },
  methods: {
    handleGetPosts() {
      // reach out to Vuex store, fire action that gets posts for carousel
      this.$store.dispatch("getPosts");
    },
    goToPost(postId) {
      this.$router.push(`/posts/${postId}`);
    }
  },
  computed: {
    /* posts() {
      return this.$store.getters.posts;
    },
    loading() {
      return this.$store.getters.loading;
    } */
    ...mapGetters(["loading", "posts"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.carousel-title {
  position: absolute;
  bottom: 0px;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem;
}
</style>
