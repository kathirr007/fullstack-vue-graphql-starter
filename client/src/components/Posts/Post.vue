<template>
  <v-container class="post p-0 mt-3" flexbox center v-if="getPost">
    <!-- Post Card -->
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h1>{{ getPost.title }}</h1>
            <v-btn flat4 icon large v-if="user">
              <v-icon large color="grey">favorite</v-icon>
            </v-btn>
            <h3 class="ml-3 font-weight-thin">{{ getPost.likes }} Likes</h3>
            <v-spacer></v-spacer>
            <v-btn flat4 icon large @click="goToPrevPage">
              <v-icon color="secondary">arrow_back</v-icon>
            </v-btn>
          </v-card-title>
          <v-tooltip right>
            <span>Click to enlarge image</span>
            <template>
              <v-img
                slot="activator"
                class="white--text"
                id="post__image"
                :src="getPost.imageUrl"
                @click="toggleImageDialog"
              >
              </v-img>
            </template>
          </v-tooltip>
          <!-- Post image dialog -->
          <v-dialog v-model="dialog">
            <v-card>
              <v-img contain height="75vh" :src="getPost.imageUrl"></v-img>
            </v-card>
          </v-dialog>
          <v-card-text>
            <span v-for="(category, index) in getPost.categories" :key="index">
              <v-chip class="mb-3" color="secondary" text-color="white">{{ category }}</v-chip>
            </span>
            <h3>{{ getPost.description }}</h3>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- Messages section -->
    <div class="mt-3">
      <!-- Message input -->
      <v-layout row wrap v-if="user">
        <v-flex xs12>
          <v-form>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  clearable
                  append-outer-icon="send"
                  label="Add Message"
                  type="text"
                  required
                  prepend-icon="email"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-flex>
      </v-layout>
      <!-- Messages -->
      <v-layout row wrap>
        <v-flex xs12>
          <v-list subheader two-line>
            <v-subheader>Messages ({{ getPost.messages.length }})</v-subheader>
            <template v-for="message in getPost.messages">
              <v-divider :key="message._id"></v-divider>
              <v-list-tile avatar inset :key="message.title">
                <v-list-tile-avatar>
                  <img :src="message.messageUser.avatar" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ message.messageBody }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ message.messageUser.username }}</v-list-tile-sub-title>
                  <span class="grey--text text--lighten-1 hidden-xs-only">
                    <v-icon color="grey">chat_bubble</v-icon>
                  </span>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import { GET_POST } from '../../queries'
import { mapGetters } from 'vuex'

export default {
  name: 'Post',
  props: ['postId'],
  data() {
    return {
      dialog: false
    }
  },
  apollo: {
    getPost: {
      query: GET_POST,
      variables() {
        return {
          postId: this.postId
        }
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    goToPrevPage() {
      this.$router.go(-1)
    },
    toggleImageDialog() {
      if (window.innerWidth > 500) {
        this.dialog = !this.dialog
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#post__image {
  height: 400px !important;
}
</style>
