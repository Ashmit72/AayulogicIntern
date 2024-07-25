<template lang="">
  <v-form @submit.prevent="submitForm">
    <v-text-field v-model="prizeData.title" label="Enter the Title" variant="solo" required></v-text-field>
    <v-file-input
      v-model="prizeData.image"
      clearable
      density="compact"
      label="Prize Image"
      variant="solo"
      accept="image/*"
    ></v-file-input>
    <v-textarea
      v-model="prizeData.description"
      label="Enter the Description"
      variant="solo"
      required
    ></v-textarea>
    <div class="buttons">
      <v-btn
        @click="setStatus('Draft')"
        type="submit"
        class="bg-success"
        style="margin-right: 1rem"
      >Draft</v-btn>
      <v-btn @click="setStatus('Published')" type="submit" class="bg-warning">Publish</v-btn>
    </div>
  </v-form>
</template>

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
const prizeData = ref({
  title: '',
  image: null,
  description: '',
  status: ''
});
const config = {
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`
  }
};

const getPrizeDataById = async () => {
  try {
    const response = await axios.get(`${api()}/v1/prize/${id}`);
    if (response.status === 200) {
      prizeData.value = {
        ...response.data,
        image: response.data.prizeImage
      };
    }
  } catch (error) {
    toast.error(error.response?.data?.error || 'Failed to fetch data', {
      position: 'top-right'
    });
  }
};

const submitForm = async () => {
  if (id) {
    await patchPrizeData();
  } else {
    await postPrizeData();
  }
};

const postPrizeData = async () => {
  const form = new FormData();
  for (const key in prizeData.value) {
    form.append(key, prizeData.value[key]);
  }
  try {
    const response = await axios.post(`${api()}/v1/prize/create`, form, config);
    if (response.status === 200) {
      router.push('/admin/prize');
      resetForm();
    } else {
      toast.error('Something Went Wrong!', {
        position: 'top-right'
      });
    }
  } catch (error) {
    toast.error(error.response?.data?.error || 'Failed to submit data', {
      position: 'top-right'
    });
  }
};

const patchPrizeData = async () => {
  const form = new FormData();
  for (const key in prizeData.value) {
    form.append(key, prizeData.value[key]);
  }
  try {
    const response = await axios.patch(`${api()}/v1/prize/${id}`, form, config);
    if (response.status === 200) {
      router.push('/admin/prize');
      resetForm();
    } else {
      toast.error('Something Went Wrong!', {
        position: 'top-right'
      });
    }
  } catch (error) {
    toast.error(error.response?.data?.error || 'Failed to update data', {
      position: 'top-right'
    });
  }
};

const setStatus = (status) => {
  prizeData.value.status = status;
};

const resetForm = () => {
  prizeData.value = {
    title: '',
    image: null,
    description: '',
    status: ''
  };
};

onMounted(() => {
  if (id) {
    getPrizeDataById();
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
