<script setup>
import { api } from '@/api'
import axios from 'axios'
import Cookies from 'js-cookie'
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router'
import { useToast } from 'vue-toast-notification';
import CustomDataTable from '@/components/Admin/CustomDataTable.vue';

const loading= ref(false)
      const pagination= ref({})
      const eventData= ref([])
      const toast=useToast()
      const config= {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      }

      const  headers=ref( [
        {
          align: 'start',
          key: 'image',
          sortable: false,
          title: 'Image'
        },
        {
          align: 'start',
          key: 'title',
          sortable: false,
          title: 'Title'
        },
        {
          align: 'start',
          key: 'createdAt',
          sortable: false,
          title: 'Created'
        },
        {
          align: 'start',
          key: 'updatedAt',
          sortable: false,
          title: 'Updated'
        },
        {
          align: 'start',
          key: 'status',
          sortable: false,
          title: 'Status'
        },
        {
          key: 'edit',
          title: 'Edit'
        },
        {
          key: 'delete',
          title: 'Delete'
        }
      ])

      onMounted(()=>{
        getEventData()
      })

      const getEventData=async()=> {
      try {
        loading.value = true
        const response = await axios.get(`${api()}/v1/event/?per_page=10&page=1`)
        if (response.data.events) {
          console.log(response.data.events)
          eventData.value = response.data.events
          pagination.value = response.data.pagination
        } else {
          console.log('Something Went Wrong')
        }
      } catch (error) {
        console.log(error.message)
      }
      loading.value = false
    }

    const handleDeleteEventClick=async(id)=> {
      try {
        const response = await axios.delete(`${api()}/v1/event/${id}`, config)
        if (response.status === 200) {
          toast.success('Event Deleted', {
            position: 'top-right'
          })
          this.getEventData()
        } else {
          toast.error('Event Failed to Delete!', {
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
  <template v-if="loading">
    <v-container fluid fill-height class="d-flex justify-center align-center">
      <v-progress-circular indeterminate color="primary" size="64" width="6"></v-progress-circular>
    </v-container>
  </template>
  <template v-else-if="eventData.length === 0">
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
            :items="eventData"
            :headers="headers"
            :pagination="pagination"
            @delete-item="handleDeleteEventClick"
            :imageKey="'eventImage'"
          >
          </custom-data-table>
        </v-card>
      </v-col>
    </v-row>
  </template>
</template>

<style lang="scss" scoped></style>
