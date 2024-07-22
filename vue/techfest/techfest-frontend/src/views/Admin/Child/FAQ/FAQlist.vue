<template>
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
      <v-card class="card-container">
        <custom-data-table
         :items="faqData" 
         :headers 
         :pagination
         @delete-item="faqDeleteData"
         >
        </custom-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { api } from '@/api'
import axios from 'axios'
import Cookies from 'js-cookie'
import { RouterLink } from 'vue-router';
import CustomDataTable from '@/components/Admin/CustomDataTable.vue'

export default {
  components:{CustomDataTable},
  data() {
    return {
      faqData: [],
      pagination: {
        totalPage: 1,
        totalItems: 0,
        itemsPerPage: 10,
        currentPage: 1
      },
      config: {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      },
      headers: [
        {
          align: 'start',
          key: 'title',
          sortable: false,
          title: 'Question'
        },
        {
          align: 'start',
          key: 'status',
          sortable: false,
          title: 'Status'
        },
        {
          align: 'start',
          key: 'edit',
          title: 'Edit'
        },
        {
          align: 'start',
          key: 'delete',
          title: 'Delete'
        }
      ]
    }
  },
  methods: {
    async getFAQData() {
      try {
        const response = await axios.get(`${api()}/v1/faq?per_page=10&page=1`,this.config)
        if (response.status === 200) {
          this.faqData = response.data.faqs //
          this.pagination = response.data.pagination
          console.log(this.faqData)
        }
      } catch (error) {
        this.$toast.error(error.message, {
          position: 'top-right'
        })
      }
    },
    async faqDeleteData(id){
      try {
        const response=await axios.delete(`${api()}/v1/faq/${id}`,this.config)
        if (response.data.message) {
          this.$toast.success(response.data.message, {
            position: 'top-right'
          })}
          else{
            this.$toast.error('Something Went Wrong', {
            position: 'top-right'
          })}
          this.getFAQData()
          }
       catch (error) {
        this.$toast.error(error.message, {
          position: 'top-right'
        })
      }
    }
  },
  mounted() {
    this.getFAQData()
  }
}
</script>

<style lang="scss">
// .card-container {
//   padding: 1rem;
// }
</style>
