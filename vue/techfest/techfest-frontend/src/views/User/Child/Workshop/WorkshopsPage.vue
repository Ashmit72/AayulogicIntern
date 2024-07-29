<script setup>
import { onMounted } from 'vue'
import { useWorkshopUserStore } from '../../../../../store/user/workshop';


const workshop=useWorkshopUserStore()

onMounted(() => {
  workshop.getworkshops()
})


</script>
<template>
  <v-row>
    <v-col xl="6" v-for="workshop in workshop.workshops">
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
