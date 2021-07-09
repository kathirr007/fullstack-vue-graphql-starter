<template>
  <v-container class="posts px-0 py-2" v-if="infiniteScrollPosts" grid-list-xl>
    <!-- Posts cards -->
    <v-layout row wrap v-if="infiniteScrollPosts">
      <v-flex xs12 sm6 v-for="post in infiniteScrollPosts.posts" :key="post._id">
        <v-card hover>
          <v-img @click.native="goToPost(post._id)" height="30vh" :src="post.imageUrl" />
          <v-card-actions>
            <v-card-title primary>
              <div>
                <div class="headline">{{ post.title }}</div>
                <span class="grey--text"
                  >{{ post.likes }} likes - {{ post.messages.length }} comments</span
                >
              </div>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="showPostCreator = !showPostCreator">
              <v-icon>{{ `keyboard_arrow_${showPostCreator ? 'up' : 'down'}` }}</v-icon>
            </v-btn>
          </v-card-actions>
          <!-- Post creator tile -->
          <v-slide-y-transition>
            <v-card-text v-show="showPostCreator" class="grey lighten-4">
              <v-list three-line class="grey lighten-4">
                <v-list-tile avatar class="px-0">
                  <v-list-tile-avatar>
                    <img :src="post.createdBy.avatar" alt="" />
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title class="text--primary">{{
                      post.createdBy.username
                    }}</v-list-tile-title>
                    <v-list-tile-sub-title class="body-1"
                      >Added {{ post.createdDate }}</v-list-tile-sub-title
                    >
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn icon ripple>
                      <v-icon color="grey lighten-1">info</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout v-if="showMoreEnabled" row wrap>
      <v-flex xs12>
        <v-layout justify-center row wrap>
          <v-btn color="secondary" @click="showMorePosts">Fetch More</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
    <!-- <v-btn @click="showMorePosts" color="" class="ma-0 my-2">
      Fetch More
    </v-btn> -->
  </v-container>
</template>

<script>
import { INFINITE_SCROLL_POSTS } from '../../queries'

const pageSize = 2

export default {
  name: 'Posts',
  data() {
    return {
      pageNum: 1,
      showMoreEnabled: true,
      showPostCreator: false
    }
  },
  apollo: {
    infiniteScrollPosts: {
      query: INFINITE_SCROLL_POSTS,
      variables: {
        pageNum: 1,
        pageSize
      }
    }
  },
  methods: {
    showMorePosts() {
      this.pageNum += 1
      // fetch more data and transform original results
      this.$apollo.queries.infiniteScrollPosts.fetchMore({
        variables: {
          // pageNum incremented by 1
          pageNum: this.pageNum,
          pageSize
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          console.log('previous result', prevResult.infiniteScrollPosts.posts)
          console.log('fetch more result', fetchMoreResult.infiniteScrollPosts.posts)
          const newPosts = fetchMoreResult.infiniteScrollPosts.posts
          const hasMore = fetchMoreResult.infiniteScrollPosts.hasMore
          this.showMoreEnabled = hasMore

          return {
            infiniteScrollPosts: {
              __typename: prevResult.infiniteScrollPosts.__typename,
              // Merge previous posts with new posts
              posts: [...prevResult.infiniteScrollPosts.posts, ...newPosts],
              hasMore
            }
          }
        }
      })
    },
    goToPost(postId) {
      this.$router.push(`/posts/${postId}`)
    }
  }
}
</script>

<style lang="scss" scoped></style>
