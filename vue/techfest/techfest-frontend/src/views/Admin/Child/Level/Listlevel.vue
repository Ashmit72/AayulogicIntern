<script setup>
import { api } from '@/api';
import axios from 'axios';
import Cookies from 'js-cookie';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import { RouterLink } from 'vue-router';
import CustomDataTable from '@/components/Admin/CustomDataTable.vue';

const loading = ref(false);
const toast = useToast();
const pagination = ref({});
const levelData = ref([]);
const headers = [
  {
    align: 'start',
    key: 'title',
    sortable: false,
    title: 'Title'
  },
  {
    align: 'start',
    key: 'priority',
    sortable: false,
    title: 'Priority'
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
];
const config = {
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`
  }
};

const getLevelData = async () => {
  try {
    loading.value = true;
    const response = await axios.get(`${api()}/v1/sponsor-level/?per_page=10&page=1`);
    if (response.data.levels) {
      levelData.value = response.data.levels;
      pagination.value = response.data.pagination;
    } else {
      console.log('Something Went Wrong');
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    loading.value = false;
  }
};

const handleDeleteLevelClick = async (id) => {
  try {
    const response = await axios.delete(`${api()}/v1/sponsor-level/${id}`, config);
    if (response.status === 200) {
      toast.success('Level Deleted', {
        position: 'top-right'
      });
      await getLevelData(); // Call the function directly
    } else {
      toast.error('Level Failed to Delete!', {
        position: 'top-right'
      });
    }
  } catch (error) {
    toast.error(error.message, {
      position: 'top-right'
    });
  }
};

onMounted(() => {
  getLevelData();
});
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
              :items="levelData"
              :headers="headers"
              :pagination="pagination"
              @delete-item="handleDeleteLevelClick"
            ></custom-data-table>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </template>
  
  
  <style lang="scss" scoped></style>
  