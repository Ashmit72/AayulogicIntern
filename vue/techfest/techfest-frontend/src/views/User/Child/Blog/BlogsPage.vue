<script setup >
import { api } from '@/api';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toast-notification';

 const blogData= ref([])
const toast=useToast()

 onMounted(()=>{
  getBlogData()
 })

const getBlogData=async()=> {
        try {
          const response = await axios.get(`${api()}/v1/frontend/blog?per_page=10&page=1`)
          if (response.status === 200) {
            blogData.value = response.data.blogs
          }
        } catch (error) {
          toast.error(error.message, {
            position: 'top-right'
          })
        }
      }
    

</script>
<template>
    <v-row>
      <v-col xl="6" v-for="blog in blogData">
        <v-card class="mx-auto" max-width="900">
          <v-img height="200px" :src="blog.featuredImage?.url" cover></v-img>
          <v-card-title>{{ blog.title }}</v-card-title>
          <v-card-subtitle>Created At {{ blog.createdAt }}</v-card-subtitle>
          <v-card-actions>
            <router-link :to="`blog/${blog.slug}`" >
            <v-btn variant="tonal" color="green-lighten-2" text="Explore"></v-btn>
          </router-link>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </template>
  
  <style scoped>
  .blog-container {
    height: 400px;
    cursor: pointer;
  }
  </style>
  