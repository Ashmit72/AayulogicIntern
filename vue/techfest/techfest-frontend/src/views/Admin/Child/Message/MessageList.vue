<template>
    <template v-if="loading">
      <v-container fluid fill-height class="d-flex justify-center align-center">
        <v-progress-circular indeterminate color="primary" size="64" width="6"></v-progress-circular>
      </v-container>
    </template>
    <template v-else-if="messageData.length === 0">
        <v-title class="text-h1 text-center">There are no Messages</v-title>
    </template>
    <template v-else>
        <v-row>
            <v-col col="12" class="text-center">
                <!-- <RouterLink :to="$route.fullPath+'/create'">
                    <v-icon
                    style="transform: scale(1.4); cursor: pointer"
                    color="green"
                    icon="mdi-pencil-plus"
                    ></v-icon>
                     {{ messageData }} -->
          <!-- </RouterLink> --> 
           <h2 class="text-h4" >Messages List</h2>

        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <custom-data-table
              :items="messageData"
              :headers="headers"
              :pagination="pagination"
              @delete-item="handleDeleteMessageClick"
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

  
  import CustomDataTable from '@/components/Admin/CustomDataTable.vue'
  
  export default {
    components: { CustomDataTable },
    data() {
      return {
        loading: false,
        pagination: {},
        messageData: [],
        config: {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        },
        headers: [
          {
            align: 'start',
            key: 'name',
            sortable: false,
            title: 'Name'
          },
          {
           align:'start',
           key:'phone',
           sortable:false,
           title:'Phone no'
          },
          {
            align: 'start',
            key: 'email',
            sortable: false,
            title: 'Sent By'
          },
          {
            align: 'start',
            key: 'subject',
            sortable: false,
            title: 'Subject'
          },
          {
            key: 'delete',
            title: 'Delete'
          },
          {
            key:"view",
            title:'View'
          }
        ]
      }
    },
    methods: {
      async getmessageData() {
        try {
          this.loading = true
          const response = await axios.get(`${api()}/v1/contact-request`)
          if (response.data.requests) {
            this.messageData = response.data.requests
            this.pagination = response.data.pagination
          } else {
            console.log('Something Went Wrong')
          }
        } catch (error) {
          console.log(error.message)
        }
        this.loading = false
      },
  
      async handleDeleteMessageClick(id) {
        try {
          const response = await axios.delete(`${api()}/v1/contact-request/${id}`, this.config)
          if (response.status === 200) {
            this.$toast.success('Message Deleted', {
              position: 'top-right'
            })
            this.getmessageData()
          } else {
            this.$toast.error('Message Failed to Delete!', {
              position: 'top-right'
            })
          }
        } catch (error) {
          this.$toast.error(error.message, {
            position: 'top-right'
          })
        }
      },
    },
    mounted() {
      this.getmessageData()
    }
  }
  </script>
  
  <style lang="scss" scoped></style>
  