<script setup >
import { api } from '@/api';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toast-notification';

const toast=useToast()
const eventData= ref([])

onMounted(()=>{
  geteventData()
})

const geteventData=async()=> {
      try {
        const response = await axios.get(`${api()}/v1/frontend/event?per_page=10&page=1`)
        if (response.status === 200) {
          eventData.value = response.data.events
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
    <v-col xl="6" v-for="event in eventData">
      <v-card class="mx-auto" max-width="900">
        <v-img height="200px" :src="event.eventImage?.url" cover></v-img>
        <v-card-title>{{ event.title }}</v-card-title>
        <v-card-actions>
          <router-link :to="`events/${event.id}`" >
          <v-btn variant="tonal" color="orange-lighten-2" text="Explore"></v-btn>
        </router-link>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.event-container {
  height: 400px;
  cursor: pointer;
}
</style>
