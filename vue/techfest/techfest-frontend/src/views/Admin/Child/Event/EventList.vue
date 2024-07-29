<script setup>
import { onMounted} from 'vue'
import { RouterLink } from 'vue-router'
import CustomDataTable from '@/components/Admin/CustomDataTable.vue'
import { useAdminEventStore } from '../../../../../store/admin/event';


const event=useAdminEventStore()

onMounted(() => {
  event.getEventData()
})
</script>

<template>
  <template v-if="event.loading">
    <v-container fluid fill-height class="d-flex justify-center align-center">
      <v-progress-circular indeterminate color="primary" size="64" width="6"></v-progress-circular>
    </v-container>
  </template>
  <template v-else-if="event.eventData.length === 0">
    <v-title class="text-h1 text-center">There are no Events</v-title>
    <v-container>
      <RouterLink :to="$route.fullPath + '/create'">
        <v-icon
          style="transform: scale(1.4); cursor: pointer"
          color="green"
          icon="mdi-pencil-plus"
        ></v-icon>
      </RouterLink>
    </v-container>
  </template>
  <template v-else>
    <v-row>
      <v-col col="12" class="text-center">
        <RouterLink :to="$route.fullPath + '/create'">
          <v-icon
            style="transform: scale(1.4); cursor: pointer"
            color="green"
            icon="mdi-pencil-plus"
          ></v-icon>
        </RouterLink>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <custom-data-table
            :items="event.eventData"
            :headers="event.headers"
            :pagination="event.pagination"
            @delete-item="event.handleDeleteEventClick"
            :imageKey="'eventImage'"
          >
          </custom-data-table>
        </v-card>
      </v-col>
    </v-row>
  </template>
</template>

<style lang="scss" scoped></style>
