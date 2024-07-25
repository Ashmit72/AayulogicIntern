<script setup>
import { api } from '@/api';
import axios from 'axios';
import CustomDataTable from '@/components/Admin/CustomDataTable.vue';
import Cookies from 'js-cookie'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toast-notification';

const loading = ref(false)
const pagination = ref({})
const workShopData = ref([])
const toast=useToast()
const config = ref({
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`
  }
})

onMounted(()=>{
  getWorkShopData()
})


const headers = ref([
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
const getWorkShopData=async()=>{
      try {
        loading.value = true
        const response = await axios.get(`${api()}/v1/workshop/?per_page=10&page=1`)
        if (response.data.workshops) {
          workShopData.value = response.data.workshops
          pagination.value = response.data.pagination
        } else {
          console.log('Something Went Wrong')
        }
      } catch (error) {
        console.log(error.message)
      }
      loading.value = false
    }


const  handleDeleteWorkshopClick=async(id)=> {
      try {
        const response = await axios.delete(`${api()}/v1/workshop/${id}`, config.value)
        if (response.status === 200) {
          toast.success('Workshop Deleted', {
            position: 'top-right'
          })
          getWorkShopData()
        } else {
          toast.error('Workshop Failed to Delete!', {
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
  <template v-else>
    <v-row>
      <v-col col="12" class="text-center">
        <RouterLink :to="$route.fullPath + '/create'">
          <v-icon
          style="transform: scale(1.4); cursor: pointer"
          color="green"
          icon="mdi-pencil-plus"
          :imageKey="'workshopImage'"
          ></v-icon>
        </RouterLink>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <custom-data-table
            :items="workShopData"
            :headers="headers"
            :pagination="pagination"
            @delete-item="handleDeleteWorkshopClick"
            :imageKey="'workshopImage'"
          ></custom-data-table>
        </v-card>
      </v-col>
    </v-row>
  </template>
</template>

<style lang="scss" scoped></style>
