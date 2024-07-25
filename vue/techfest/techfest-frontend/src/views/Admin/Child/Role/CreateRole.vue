<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { api } from '@/api';
import { useToast } from 'vue-toast-notification';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const id = route.params.id;

const roleData = ref({
  title: '',
  level: null,
  status: ''
});

const config = {
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`
  }
};

const getRoleDataById = async () => {
  try {
    const response = await axios.get(`${api()}/v1/role/${id}`);
    if (response.status === 200) {
      roleData.value = {
        ...response.data
      };
    }
  } catch (error) {
    toast.error(error.response?.data?.error || 'Failed to fetch data', {
      position: 'top-right'
    });
  }
};

const postRoleData = async () => {
  try {
    const response = await axios.post(`${api()}/v1/role/create`, roleData.value, config);
    if (response.status === 200) {
      router.push('/admin/role');
    } else {
      toast.error('Something Went Wrong', {
        position: 'top-right'
      });
    }
  } catch (error) {
    toast.error(error.response?.data?.error || 'Failed to submit data', {
      position: 'top-right'
    });
  }
};

const patchRoleData = async () => {
  try {
    const response = await axios.patch(`${api()}/v1/role/${id}`, roleData.value, config);
    if (response.status === 200) {
      router.push('/admin/role');
    } else {
      toast.error('Something Went Wrong', {
        position: 'top-right'
      });
    }
  } catch (error) {
    toast.error(error.response?.data?.error || 'Failed to update data', {
      position: 'top-right'
    });
  }
};

const handleSubmit = async () => {
  if (id) {
    await patchRoleData();
  } else {
    await postRoleData();
  }
};

onMounted(() => {
  if (id) {
    getRoleDataById();
  }
});
</script>

<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field v-model="roleData.title" label="Enter the Title" variant="solo"></v-text-field>

    <v-text-field
      v-model="roleData.level"
      type="number"
      label="Enter the Level"
      variant="solo"
    ></v-text-field>

    <div class="buttons">
      <v-btn
        @click="roleData.status = 'Draft'"
        type="submit"
        class="bg-success"
        style="margin-right: 1rem"
      >Draft</v-btn>
      <v-btn
        @click="roleData.status = 'Published'"
        type="submit"
        class="bg-warning"
      >Publish</v-btn>
    </div>
  </v-form>
</template>

<style>
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style
