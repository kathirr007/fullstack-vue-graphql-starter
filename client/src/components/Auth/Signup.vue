<template>
  <div class="signin text-xs-center">
    <!-- Signup Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Get started here..!</h1>
      </v-flex>
    </v-layout>
    <!-- Error Alert -->
    <v-layout row wrap v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <form-alert :message="error.message"></form-alert>
      </v-flex>
    </v-layout>
    <!-- Signup Form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="blue-grey lighten-4">
          <v-container grid-list-xs>
            <v-form
              v-model="isFormValid"
              lazy-validation
              @submit.prevent="handleSignupUser"
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
                    prepend-icon="email"
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="extension"
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="gavel"
                    v-model="passwordConfirmation"
                    :rules="passwordRules"
                    label="Confirm Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs12>
                  <v-btn
                    color="info"
                    :disabled="!isFormValid || loading"
                    :loading="loading"
                    type="submit"
                  >
                    <span slot="loader" class="custom-loader">
                      <v-icon light class="white--text">cached</v-icon>
                    </span>
                    Signup
                  </v-btn>
                  <h3>Already have an account?</h3>
                  <router-link to="/singin">Signin</router-link>
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
import { mapGetters } from "vuex";

export default {
  name: "Signup",
  data() {
    return {
      isFormValid: true,
      username: "",
      password: "",
      email: "",
      passwordConfirmation: "",
      usernameRules: [
        // Check if username in input
        username => !!username || "Username is required",
        // Make sure the username is lessthan 10 Characters
        username => username.length < 10 || "Username must be less than 10 Characters"
      ],
      emailRules: [
        // Check if email in input
        email => !!email || "Email is required",
        // Make sure the username is lessthan 10 Characters
        email => /.@+./.test(email) || "Email must be valid"
      ],
      passwordRules: [
        // Check if password in input
        password => !!password || "Password is required",
        // Make sure the username is lessthan 10 Characters
        password => password.length >= 7 || "Password must be at least 7 Characters",
        confirmation => confirmation === this.password || "Passwords must match"
      ]
    };
  },
  computed: {
    ...mapGetters(["user", "error", "loading"])
  },
  watch: {
    user(value) {
      // if user value changes, redirect to the home page
      if (value) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    handleSignupUser() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("signupUser", {
          username: this.username,
          email: this.email,
          password: this.password
        });
      }
    }
  }
};
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
