<template>
    <v-row>
      <v-col xl="6" v-for="blog in blogData">
        <v-card class="mx-auto" max-width="900">
          <v-img height="200px" :src="blog.featuredImage?.url" cover></v-img>
          <v-card-title>{{ blog.title }}</v-card-title>
          <v-card-subtitle>Created At {{ blog.createdAt }}</v-card-subtitle>
          <v-card-actions>
            <router-link :to="`blog/${blog.slug}`" >
            <v-btn variant="tonal" color="orange-lighten-2" text="Explore"></v-btn>
          </router-link>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </template>
  <script>
  import { api } from '@/api'
  import axios from 'axios'
  
  export default {
    data() {
      return {
        blogData: []
      }
    },
    mounted() {
      this.getBlogData()
    },
    methods: {
      async getBlogData() {
        try {
          const response = await axios.get(`${api()}/v1/frontend/blog?per_page=10&page=1`)
          if (response.status === 200) {
            this.blogData = response.data.blogs
          }
        } catch (error) {
          this.$toast.error(error.message, {
            position: 'top-right'
          })
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .blog-container {
    height: 400px;
    cursor: pointer;
  }
  </style>
  