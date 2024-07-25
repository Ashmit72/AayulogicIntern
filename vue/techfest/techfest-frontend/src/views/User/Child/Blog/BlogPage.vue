<script setup >
import { api } from '@/api';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const toast=useToast()
const route=useRoute()
const blogData=ref({})

onMounted(()=>{
  getBlogData()
})

const getBlogData=async()=> {
      try {
        const response = await axios.get(`${api()}/v1/frontend/blog/${route.params.slug}`)
        if (response.status === 200) {
          blogData.value = response.data
        } else {
          toast.error('Something went wrong', {
            position: 'top-right'
          })
        }
      } catch (error) {
        toast.error(error.message, {
          position: 'top-right'
        })
      }
    }

</script>

<template>
  <v-container class="blog-container">
    <v-row>
      <v-col cols="12" md="8" class="mx-auto">
        <v-img
          aspect-ratio="16/9"
          cover
          :src="
            blogData.featuredImage?.url || 'https://cdn.vuetifyjs.com/images/parallax/material.jpg'
          "
        ></v-img>
        <v-card class="mt-4">
          <v-card-title>{{ blogData.title }}</v-card-title>
          <v-card-subtitle>Created At {{ blogData.createdAt }}</v-card-subtitle>
          <v-card-text>
            <div v-html="blogData.content"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

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
