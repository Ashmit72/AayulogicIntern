<script setup >
import { onMounted } from 'vue';
import { useUserBlogStore } from '../../../../../store/user/blog';


const blog=useUserBlogStore()

onMounted(()=>{
  blog.getBlogData()
})


</script>

<template>
  <v-container class="blog-container">
    <v-row>
      <v-col cols="12" md="8" class="mx-auto">
        <v-img
          aspect-ratio="16/9"
          cover
          :src="
            blog.blogData.featuredImage?.url || 'https://cdn.vuetifyjs.com/images/parallax/material.jpg'
          "
        ></v-img>
        <v-card class="mt-4">
          <v-card-title>{{ blog.blogData.title }}</v-card-title>
          <v-card-subtitle>Created At {{ blog.blogData.createdAt }}</v-card-subtitle>
          <v-card-text>
            <div v-html="blog.blogData.content"></div>
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
