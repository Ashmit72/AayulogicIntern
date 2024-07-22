<template>
  <v-container class="blog-container">
    <v-row>
      <v-col cols="12" md="8" class="mx-auto">
        <v-img
          aspect-ratio="16/9"
          cover
          :src="blogData.featuredImage?.url || 'https://cdn.vuetifyjs.com/images/parallax/material.jpg'"
        ></v-img>
        <v-card class="mt-4">
          <v-card-title>{{ blogData.title }}</v-card-title>
          <v-card-subtitle>Created At {{ blogData.createdAt}}</v-card-subtitle>
          <v-card-text>
            <div v-html="blogData.content"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { api } from '@/api';
import axios from 'axios';

export default {
  data() {
    return {
      blogData: {},
    };
  },
  mounted() {
    this.getBlogData();
  },
  methods: {
    async getBlogData() {
      try {
        const response = await axios.get(`${api()}/v1/frontend/blog/${this.$route.params.slug}`);
        if (response.status === 200) {
          console.log(response.data);
          this.blogData = response.data;
        } else {
          this.$toast.error('Something went wrong', {
            position: 'top-right',
          });
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
        this.$toast.error(error.response?.data?.error || 'Failed to fetch blog data', {
          position: 'top-right',
        });
      }
    },
  },
  filters: {
    formatDate(value) {
      if (value) {
        return new Date(value).toLocaleDateString();
      }
      return '';
    },
  },
};
</script>

<style scoped>
.blog-container {
  padding: 16px;
  border-radius: 12px;
}

.v-img {
  height: 500px;
  max-width: 100%;
}

.v-card {
  max-width: 100%;
}
</style>
