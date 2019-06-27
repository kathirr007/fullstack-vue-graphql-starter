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
        <v-list-tile ripple v-for="item in sideNavItems" :key="item.title" :to="item.link" class="white--text">
          <v-list-tile-action>
            <v-icon class="white--text">{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{item.title}}
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
        flex prepend-icon="search" placeholder="Search posts" color="accent" single-line hide-details
      ></v-text-field>

      <v-spacer></v-spacer>

      <!-- Horizontal Navbar links -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
          <v-icon left class="hidden-sm-only">{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- App content -->
    <main>
      <v-container grid-list-xs class="mt-5">
        <transition name="fade">
          <router-view/>
        </transition>
      </v-container>
    </main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  },
  data () {
    return {
      sideNav: false
    }
  },
  computed: {
    horizontalNavItems() {
      return [
        {icon: 'chat', title: 'Posts', link: '/posts'},
        {icon: 'lock_open', title: 'Sign In', link: '/signin'},
        {icon: 'create', title: 'Sign Up', link: '/signup'},
      ]
    },
    sideNavItems() {
      return [
        {icon: 'chat', title: 'Posts', link: '/posts'},
        {icon: 'lock_open', title: 'Sign In', link: '/signin'},
        {icon: 'create', title: 'Sign Up', link: '/signup'},
      ]
    }
  }
}
</script>

<style lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition-property: opacity;
    transition-duration: .1s;
  }
  .fade-enter-active {
    transition-delay: .1s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
