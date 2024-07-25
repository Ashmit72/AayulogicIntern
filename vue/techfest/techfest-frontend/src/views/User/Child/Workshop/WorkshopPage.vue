<script setup>
import { api } from '@/api'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const workshopData = ref({})
const route=useRoute()
const toast=useToast()

onMounted(() => {
  getworkshopData()
})

const getworkshopData = async () => {
  try {
    const response = await axios.get(`${api()}/v1/frontend/workshop/${route.params.id}`)
    if (response.status === 200) {
      workshopData.value = response.data
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
            workshopData.workshopImage?.url ||
            'https://cdn.vuetifyjs.com/images/parallax/material.jpg'
          "
        ></v-img>
        <v-card class="mt-4">
          <v-card-title>{{ workshopData.title }}</v-card-title>
          <v-card-subtitle>Link: {{ workshopData.link }}</v-card-subtitle>
          <v-card-text>
            <div v-html="workshopData.description"></div>
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
