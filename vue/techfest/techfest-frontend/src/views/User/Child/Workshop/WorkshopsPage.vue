<script setup>
import { api } from '@/api'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toast-notification'

const workshopData = ref([])
const toast = useToast()
onMounted(() => {
  getWorkshopdata()
})

const getWorkshopdata = async () => {
  try {
    const response = await axios.get(`${api()}/v1/frontend/workshop?per_page=10&page=1`)
    if (response.status === 200) {
      workshopData.value = response.data.workshops
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
    <v-col xl="6" v-for="workshop in workshopData">
      <v-card class="mx-auto" max-width="900">
        <v-img height="200px" :src="workshop.workshopImage?.url" cover></v-img>
        <v-card-title>{{ workshop.title }}</v-card-title>
        <v-card-actions>
          <router-link :to="`workshops/${workshop.id}`">
            <v-btn variant="tonal" color="orange-lighten-2" text="Explore"></v-btn>
          </router-link>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.workshop-container {
  height: 400px;
  cursor: pointer;
}
</style>
