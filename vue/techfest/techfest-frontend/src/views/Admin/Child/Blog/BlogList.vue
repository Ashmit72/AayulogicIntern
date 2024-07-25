<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import { RouterLink } from 'vue-router'
import CustomDataTable from '@/components/Admin/CustomDataTable.vue'
import { api } from '@/api'
import { useToast } from 'vue-toast-notification';

const loading = ref(false)
const toast=useToast()
const pagination = ref({})
const blogData = ref([])
const config = {
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`
  }
}
const headers = [
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
]

async function getBlogData() {
  try {
    loading.value = true
    const response = await axios.get(`${api()}/v1/blog/?per_page=10&page=1`)
    if (response.data.blogs) {
      console.log(response.data.blogs)
      blogData.value = response.data.blogs
      pagination.value = response.data.pagination
    } else {
      console.log('Something Went Wrong')
    }
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
}

async function handleDeleteBlogClick(id) {
  try {
    const response = await axios.delete(`${api()}/v1/blog/${id}`, config)
    if (response.status === 200) {
      toast().success('Blog Deleted', { position: 'top-right' })
      getBlogData()
    } else {
      toast().error('Blog Failed to Delete!', { position: 'top-right' })
    }
  } catch (error) {
    toast().error(error.message, { position: 'top-right' })
  }
}

onMounted(() => {
  getBlogData()
})

</script>

<template>
  <div>
    <template v-if="loading">
      <v-container fluid fill-height class="d-flex justify-center align-center">
        <v-progress-circular indeterminate color="primary" size="64" width="6"></v-progress-circular>
      </v-container>
    </template>
    <template v-else-if="blogData.length === 0">
      <v-title class="text-h1 text-center">There are no Blogs</v-title>
    </template>
    <template v-else>
      <v-row>
        <v-col cols="12" class="text-center">
          <RouterLink :to="$route.fullPath+'/create'">
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
              :items="blogData"
              :headers="headers"
              :pagination="pagination"
              @delete-item="handleDeleteBlogClick"
              :imageKey="'featuredImage'"
            ></custom-data-table>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
