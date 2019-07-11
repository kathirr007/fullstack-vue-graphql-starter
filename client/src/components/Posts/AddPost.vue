<template>
  <div class="add-post">
    <!-- Add post Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="primary--text text-xs-center py-3">Add Post</h1>
      </v-flex>
    </v-layout>
    <!-- Add post Form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-form v-model="isFormValid" lazy-validation @submit.prevent="handleAddPost" ref="form">
          <!-- Title input -->
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                v-model="title"
                :rules="titleRules"
                label="Post Title"
                type="text"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>

          <!-- Image url -->
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                v-model="imageUrl"
                :rules="imageRules"
                label="Image Url"
                type="text"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <!-- Image Preview area -->
          <v-layout row wrap>
            <v-flex xs12 align-center justify-center text-xs-center>
              <img :src="imageUrl" height="300px" alt="" />
            </v-flex>
          </v-layout>

          <!-- Categories select -->
          <v-layout row wrap>
            <v-flex xs12>
              <v-select
                :rules="categoriesRules"
                :items="['Art', 'Education', 'Travel', 'Photography', 'Technology']"
                multiple
                v-model="categories"
                label="Categories"
              >
              </v-select>
            </v-flex>
          </v-layout>
          <!-- Description Text Area -->
          <v-layout row wrap>
            <v-flex xs12>
              <v-textarea
                outline
                label="Description"
                :rules="descRules"
                name="name"
                v-model="description"
              >
              </v-textarea>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 class="text-xs-center">
              <v-btn
                color="primary"
                :disabled="!isFormValid || loading"
                :loading="loading"
                type="submit"
              >
                <span slot="loader" class="custom-loader">
                  <v-icon light class="white--text">cached</v-icon>
                </span>
                Submit
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AddPost",
  data() {
    return {
      isFormValid: true,
      title: "",
      imageUrl: "",
      categories: [],
      description: "",
      titleRules: [
        title => !!title || "Title is required",
        title => title.length > 20 || "Title must have at least 20 characters"
      ],
      imageRules: [image => !!image || "Image is required"],
      categoriesRules: [
        categories => categories.length >= 1 || "At least one category is required"
      ],
      descRules: [
        desc => !!desc || "Description is required",
        desc => desc.length > 200 || "Description must have at least 200 characters"
      ]
    };
  },
  computed: {
    ...mapGetters(["user", "error", "loading"])
  }
};
</script>

<style lang="scss" scoped></style>
