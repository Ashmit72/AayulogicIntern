<template>
    <template v-if="loading">
      <v-container fluid fill-height class="d-flex justify-center align-center">
        <v-progress-circular indeterminate color="primary" size="64" width="6"></v-progress-circular>
      </v-container>
    </template>
    <template v-else-if="speakerData.length === 0">
      <v-title class="text-h1 text-center">There are no Speakers</v-title>
    </template>
    <template v-else>
      <v-row>
        <v-col col="12" class="text-center">
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
              :items="speakerData"
              :headers="headers"
              :pagination="pagination"
              @delete-item="handleDeleteSpeakerClick"
              :imageKey="'speakerImage'"
            ></custom-data-table>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </template>
  
  <script>
  import { api } from '@/api'
  import axios from 'axios'
  import Cookies from 'js-cookie'
  import { RouterLink } from 'vue-router'
  
  import CustomDataTable from '@/components/Admin/CustomDataTable.vue'
  
  export default {
    components: { CustomDataTable },
    data() {
      return {
        loading: false,
        pagination: {},
        speakerData: [],
        config: {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        },
        headers: [
          {
            align: 'start',
            key: 'image',
            sortable: false,
            title: 'Image'
          },
          {
            align: 'start',
            key: 'name',
            sortable: false,
            title: 'Name'
          },
          {
            align: 'start',
            key: 'position',
            sortable: false,
            title: 'Position'
          },
          {
            align: 'start',
            key: 'twitter',
            sortable: false,
            title: 'Twitter'
          },
          {
            align: 'start',
            key: 'facebook',
            sortable: false,
            title: 'Facebook'
          },
          {
            align: 'start',
            key: 'linkedin',
            sortable: false,
            title: 'LinkedIn'
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
      }
    },
    methods: {
      async getspeakerData() {
        try {
          this.loading = true
          const response = await axios.get(`${api()}/v1/speaker/?per_page=10&page=1`)
          if (response.data.speakers) {
            this.speakerData = response.data.speakers
            this.pagination = response.data.pagination
          } else {
            console.log('Something Went Wrong')
          }
        } catch (error) {
          console.log(error.message)
        }
        this.loading = false
      },
  
      async handleDeleteSpeakerClick(id) {
        try {
          const response = await axios.delete(`${api()}/v1/speaker/${id}`, this.config)
          if (response.status === 200) {
            this.$toast.success('Speaker Deleted', {
              position: 'top-right'
            })
            this.getspeakerData()
          } else {
            this.$toast.error('Speaker Failed to Delete!', {
              position: 'top-right'
            })
          }
        } catch (error) {
          this.$toast.error(error.message, {
            position: 'top-right'
          })
        }
      }
    },
    mounted() {
      this.getspeakerData()
    }
  }
  </script>
  
  <style lang="scss" scoped></style>
  