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
          ></v-icon>
        </RouterLink>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <custom-data-table
            :items="prizeData"
            :headers="headers"
            :pagination="pagination"
            @delete-item="handleDeletePrizeClick"
            :imageKey="'prizeImage'"
          ></custom-data-table>
        </v-card>
      </v-col>
    </v-row>
  </template>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { api } from '@/api';
// import { useToast } from 'vue-toastification';
import CustomDataTable from '@/components/Admin/CustomDataTable.vue';
import { useToast } from 'vue-toast-notification';

const loading = ref(false);
const pagination = ref({});
const prizeData = ref([]);
const config = {
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`
  }
};
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
    title: 'Prize'
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
];

const toast = useToast();
const route = useRoute();

const getPrizeData = async () => {
  try {
    loading.value = true;
    const response = await axios.get(`${api()}/v1/prize/?per_page=10&page=1`);
    if (response.data.prizes) {
      prizeData.value = response.data.prizes;
      pagination.value = response.data.pagination;
    } else {
      toast.error('Something Went Wrong!', {
        position: 'top-right'
      });
    }
  } catch (error) {
    toast.error(error.response.data.error, {
      position: 'top-right'
    });
  }
  loading.value = false;
};

const handleDeletePrizeClick = async (id) => {
  try {
    const response = await axios.delete(`${api()}/v1/prize/${id}`, config);
    if (response.status === 200) {
      toast.success('Prize Deleted', {
        position: 'top-right'
      });
      getPrizeData();
    } else {
      toast.error('Prize Failed to Delete!', {
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
  getPrizeData();
});
</script>

<style lang="scss" scoped></style>
