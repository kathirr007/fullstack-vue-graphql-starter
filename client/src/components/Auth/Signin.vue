<template>
  <div class="signin text-xs-center">
    <!-- Signin Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Welcome Back!</h1>
      </v-flex>
    </v-layout>
    <!-- Error Alert -->
    <v-layout row wrap v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <form-alert :message="error.message"></form-alert>
      </v-flex>
    </v-layout>
    <!-- Signin Form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="blue-grey lighten-4">
          <v-container grid-list-xs>
            <v-form
              v-model="isFormValid"
              lazy-validation
              @submit.prevent="handleSigninUser"
              ref="form"
            >
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="face"
                    v-model="username"
                    :rules="usernameRules"
                    label="Username"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="lock"
                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs12>
                  <v-btn
                    color="accent"
                    :disabled="!isFormValid || loading"
                    :loading="loading"
                    type="submit"
                  >
                    <span slot="loader" class="custom-loader">
                      <v-icon light class="white--text">cached</v-icon>
                    </span>
                    Signin
                  </v-btn>
                  <h3>Don't have an account?</h3>
                  <router-link to="/signup">Signup</router-link>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Signin',
  data() {
    return {
      isFormValid: true,
      username: '',
      password: '',
      showPassword: false,
      usernameRules: [
        // Check if username in input
        username => !!username || 'Username is required',
        // Make sure the username is lessthan 10 Characters
        username => username.length < 10 || 'Username must be less than 10 Characters'
      ],
      passwordRules: [
        // Check if password in input
        password => !!password || 'Password is required',
        // Make sure the username is lessthan 10 Characters
        password => password.length >= 7 || 'Password must be at least 7 Characters'
      ]
    }
  },
  computed: {
    ...mapGetters(['user', 'error', 'loading'])
  },
  watch: {
    user(value) {
      // if user value changes, redirect to the home page
      if (value) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    handleSigninUser() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('signinUser', {
          username: this.username,
          password: this.password
        })
      }
    }
  }
}
</script>

<style lang="scss">
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
