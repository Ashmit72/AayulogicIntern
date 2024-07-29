<script setup >
import { onMounted } from 'vue';
import { useEventBlogStore } from '../../../../../store/user/event';


const event=useEventBlogStore()

onMounted(()=>{
  event.geteventData()
})

</script>

<template>
    <v-container class="blog-container">
      <v-row>
        <v-col cols="12" md="8" class="mx-auto">
          <v-img
            aspect-ratio="16/9"
            cover
            :src="event.eventData.eventImage?.url || 'https://cdn.vuetifyjs.com/images/parallax/material.jpg'"
          ></v-img>
          <v-card class="mt-4">
            <v-card-title>{{ event.eventData.title }}</v-card-title>
            <v-card-subtitle>Link: {{ event.eventData.link}}</v-card-subtitle>
            <v-card-text>
              <div v-html="event.eventData.description"></div>
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
  