<template>
  <v-app>
    <!-- Side Navbar -->
    <v-navigation-drawer app temporary fixed v-model="sideNav" class="secondary">
      <v-toolbar color="accent" dark flat>
        <v-toolbar-side-icon @click="sideNav = !sideNav"></v-toolbar-side-icon>
        <router-link to="/" tag="span" style="cursor:pointer">
          <h1 class="title pl-3">VueShare</h1>
        </router-link>
      </v-toolbar>

      <v-divider></v-divider>

      <!-- Side navbar links -->
      <v-list>
        <v-list-tile
          ripple
          v-for="item in sideNavItems"
          :key="item.title"
          :to="item.link"
          class="white--text"
        >
          <v-list-tile-action>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{ item.title }}
          </v-list-tile-content>
        </v-list-tile>

        <!-- Signout button -->
        <v-list-tile v-if="user" @click="handleSignoutUser">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Signout
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Horizontal Navbar -->
    <v-toolbar fixed color="primary" dark>
      <!-- App title -->
      <v-toolbar-side-icon @click="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer">
          VueShare
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Search Input -->
      <v-text-field
        flex
        prepend-icon="search"
        placeholder="Search posts"
        color="accent"
        single-line
        hide-details
      ></v-text-field>

      <v-spacer></v-spacer>

      <!-- Horizontal Navbar links -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
          <v-icon left class="hidden-sm-only">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <!-- Profile button -->
        <v-btn flat to="/profile" v-if="user">
          <v-icon class="hidden-sm-and-down" left>account_box</v-icon>
          <v-badge right color="cyan lighten-1">
            <!-- <span slot="badge">1</span> -->
            Profile
          </v-badge>
        </v-btn>

        <v-btn flat v-if="user" @click="handleSignoutUser">
          <v-icon class="hidden-sm-and-down" left>exit_to_app</v-icon>
          Signout
        </v-btn>
        <!-- Signout Button -->
      </v-toolbar-items>
    </v-toolbar>
    <!-- App content -->
    <main>
      <v-container grid-list-xs class="mt-5">
        <transition name="fade">
          <router-view />
        </transition>

        <!-- Auth Snackbar -->
        <v-snackbar v-model="authSnackbar" bottom left color="accent" :timeout="5000" class="">
          <v-icon class="mr-3 white--text">check_circle</v-icon>
          <h3>You are now signed in..!</h3>
          <v-btn flat color="white" @click.native="authSnackbar = false">Close</v-btn>
        </v-snackbar>

        <!-- Auth Error Snackbar -->
        <v-snackbar
          v-if="authError"
          v-model="authErrorSnackbar"
          bottom
          left
          color="info"
          :timeout="5000"
          class=""
        >
          <v-icon class="mr-3 white--text">cancel</v-icon>
          <h3>{{ authError.message.replace('Context creation failed:', '') }}</h3>
          <v-btn flat color="white" to="/signin">Signin</v-btn>
        </v-snackbar>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {},
  data() {
    return {
      sideNav: false,
      authSnackbar: false,
      authErrorSnackbar: false
    }
  },
  watch: {
    user(newValue, oldValue) {
      // if we have no value for user before, show snackbar
      // console.log("new value", newValue);
      // console.log("old value", oldValue);
      if (oldValue === null) {
        this.authSnackbar = true
      }
    },
    authError(value) {
      // if authError is not null, show auth error snackbar
      if (value !== null) {
        this.authErrorSnackbar = true
      }
    }
  },
  computed: {
    ...mapGetters(['authError', 'user']),
    horizontalNavItems() {
      let items = [
        { icon: 'chat', title: 'Posts', link: '/posts' },
        { icon: 'lock_open', title: 'Sign In', link: '/signin' },
        { icon: 'create', title: 'Sign Up', link: '/signup' }
      ]
      if (this.user) {
        items = [{ icon: 'chat', title: 'Posts', link: '/posts' }]
      }
      return items
    },
    sideNavItems() {
      let items = [
        { icon: 'chat', title: 'Posts', link: '/posts' },
        { icon: 'lock_open', title: 'Sign In', link: '/signin' },
        { icon: 'create', title: 'Sign Up', link: '/signup' }
      ]
      if (this.user) {
        items = [
          { icon: 'chat', title: 'Posts', link: '/posts' },
          { icon: 'stars', title: 'Create Post', link: '/posts/add' },
          { icon: 'account_box', title: 'Profile', link: '/profile' }
        ]
      }
      return items
    }
  },
  methods: {
    handleSignoutUser() {
      this.$store.dispatch('signoutUser')
    }
  }
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.1s;
}
.fade-enter-active {
  transition-delay: 0.1s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
