<script setup >
import { onMounted } from 'vue';
import { useEventBlogStore } from '../../../../../store/user/event';


const event=useEventBlogStore()

onMounted(()=>{
  event.geteventsData()
})

</script>
<template>
  <v-row>
    <v-col xl="6" v-for="event in event.events">
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
