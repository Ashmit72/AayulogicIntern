<template>
  <v-form @submit.prevent="submitForm">
    <v-text-field
      v-model="levelData.title"
      label="Enter The Title"
      variant="solo"
      required
    ></v-text-field>
    <v-text-field
      v-model="levelData.priority"
      type="number"
      label="Enter The Priority (Number)"
      variant="solo"
      required
    ></v-text-field>
    <div class="buttons">
      <v-btn
        @click="setStatus('Draft')"
        type="submit"
        class="bg-success"
        style="margin-right: 1rem"
      >Draft</v-btn>
      <v-btn
        @click="setStatus('Published')"
        type="submit"
        class="bg-warning"
      >Publish</v-btn>
    </div>
  </v-form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter, useRoute } from 'vue-router';
import { api } from '@/api';

const router = useRouter();
const route = useRoute();

const id = route.params.id;
const levelData = ref({
  title: '',
  priority: null,
  status: ''
});

const config = {
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`
  }
};

const getLevelDataById = async () => {
  try {
    const response = await axios.get(`${api()}/v1/sponsor-level/${id}`);
    if (response.status === 200) {
      levelData.value = { ...response.data };
    }
  } catch (error) {
    // Handle error
    console.error(error.response?.data?.error || 'Failed to fetch data');
  }
};

const submitForm = async () => {
  if (id) {
    await patchLevelData();
  } else {
    await postLevelData();
  }
};

const postLevelData = async () => {
  try {
    const response = await axios.post(
      `${api()}/v1/sponsor-level/create`,
      levelData.value,
      config
    );
    if (response.status === 200) {
      router.push('/admin/level');
      resetForm();
    } else {
      console.error('Something Went Wrong!');
    }
  } catch (error) {
    console.error(error.response?.data?.error || 'Failed to submit data');
  }
};

const patchLevelData = async () => {
  try {
    const response = await axios.patch(
      `${api()}/v1/sponsor-level/${id}`,
      levelData.value,
      config
    );
    if (response.status === 200) {
      router.push('/admin/level');
      resetForm();
    } else {
      console.error('Something Went Wrong!');
    }
  } catch (error) {
    console.error(error.response?.data?.error || 'Failed to update data');
  }
};

const setStatus = (status) => {
  levelData.value.status = status;
};

const resetForm = () => {
  levelData.value = {
    title: '',
    priority: null,
    status: ''
  };
};

onMounted(() => {
  if (id) {
    getLevelDataById();
  }
});
</script>

<style scoped>
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
