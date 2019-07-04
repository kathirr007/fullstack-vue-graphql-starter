import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

import FormAlert from "./components/Shared/FormAlert";

Vue.component("form-alert", FormAlert);

Vue.use(VueApollo);

// Setup ApolloClient
export const defaultClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  // include auth token with requests made to backend
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    // if no token in localStorage, add it
    if (!localStorage.token) {
      localStorage.setItem("token", "");
    }
    // operation adds the token to an authorization Headers, which is sent to backend
    operation.setContext({
      headers: {
        authorization: localStorage.getItem("token")
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log("[networkError]", networkError);
    }
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.dir(err);
        if (err.name === "AuthenticationError") {
          // Set auth error in state to (show authError snackbar)
          store.commit("setAuthError", err);
          // Signout the user (to clear the token)
          store.dispatch("signoutUser");
        }
      }
    }
  }
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

new Vue({
  apolloProvider: apolloProvider,
  router,
  store,
  render: h => h(App),
  created() {
    // execute the getCurrentUser query
    this.$store.dispatch("getCurrentUser");
  }
}).$mount("#app");
