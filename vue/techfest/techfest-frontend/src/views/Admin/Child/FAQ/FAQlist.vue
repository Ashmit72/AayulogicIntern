<template>
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
      <v-card class="card-container">
        <custom-data-table
          :items="faqData" 
          :headers="headers"
          :pagination="pagination"
          @delete-item="faqDeleteData"
        ></custom-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Cookies from 'js-cookie';
import { RouterLink } from 'vue-router';
import CustomDataTable from '@/components/Admin/CustomDataTable.vue';
import { api } from '@/api';

// Reactive state
const faqData = ref([]);
const pagination = ref({
  totalPage: 1,
  totalItems: 0,
  itemsPerPage: 10,
  currentPage: 1
});
const headers = [
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
];

const config = {
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`
  }
};


const getFAQData = async () => {
  try {
    const response = await axios.get(`${api()}/v1/faq?per_page=10&page=1`, config);
    if (response.status === 200) {
      faqData.value = response.data.faqs;
      pagination.value = response.data.pagination;
    }
  } catch (error) {
    console.error(error.message); 
  }
};

const faqDeleteData = async (id) => {
  try {
    const response = await axios.delete(`${api()}/v1/faq/${id}`, config);
    if (response.data.message) {

      console.log('Success:', response.data.message);
    } else {
      console.error('Something Went Wrong'); 
    }
    await getFAQData();
  } catch (error) {
    console.error(error.message); 
  }
};

onMounted(() => {
  getFAQData();
});
</script>

<style lang="scss">
.card-container {
  padding: 1rem;
}
</style>
