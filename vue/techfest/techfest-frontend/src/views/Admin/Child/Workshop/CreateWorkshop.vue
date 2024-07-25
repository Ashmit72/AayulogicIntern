<script setup>
import { api } from '@/api';
import axios from 'axios';
import Cookies from 'js-cookie';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const config = {
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`,
  },
};

const id = route.params.id;
const workshopData = ref({
  title: '',
  image: null,
  link: '',
  description: '',
  status: '',
});

onMounted(() => {
  if (id) {
    getWorkshopDataById();
  }
});

const getWorkshopDataById = async () => {
  try {
    const response = await axios.get(`${api()}/v1/workshop/${id}`);
    if (response.status === 200) {
      workshopData.value = {
        ...response.data,
        image: response.data.workshopImage,
      };
    }
  } catch (error) {
    toast.error(error.response?.data?.error || 'Failed to fetch data', {
      position: 'top-right',
    });
  }
};

const submitForm = async () => {
  if (id) {
    await patchWorkshopData();
  } else {
    await postWorkshopData();
  }
};

const postWorkshopData = async () => {
  const form = new FormData();
  for (const key in workshopData.value) {
    form.append(key, workshopData.value[key]);
  }
  try {
    const response = await axios.post(`${api()}/v1/workshop/create`, form, config);
    if (response.status === 200) {
      router.push('/admin/workshop');
      resetForm();
    } else {
      toast.error('Something Went Wrong!', {
        position: 'top-right',
      });
    }
  } catch (error) {
    toast.error(error.response?.data?.error || 'Failed to submit data', {
      position: 'top-right',
    });
  }
};

const patchWorkshopData = async () => {
  const form = new FormData();
  for (const key in workshopData.value) {
    form.append(key, workshopData.value[key]);
  }
  try {
    const response = await axios.patch(`${api()}/v1/workshop/${id}`, form, config);
    if (response.status === 200) {
      router.push('/admin/workshop');
      resetForm();
    } else {
      toast.error('Something Went Wrong!', {
        position: 'top-right',
      });
    }
  } catch (error) {
    toast.error(error.response?.data?.error || 'Failed to update data', {
      position: 'top-right',
    });
  }
};

const setStatus = (status) => {
  workshopData.value.status = status;
};

const resetForm = () => {
  workshopData.value = {
    title: '',
    image: null,
    link: '',
    description: '',
    status: '',
  };
};
</script>

<template>
  <v-form @submit.prevent="submitForm">
    <v-text-field
      v-model="workshopData.title"
      label="Enter the Title"
      variant="solo"
      required
    ></v-text-field>
    <v-text-field 
      v-model="workshopData.link" 
      label="Enter the Link" 
      variant="solo"
      required
    ></v-text-field>
    <v-textarea
      v-model="workshopData.description"
      label="Enter the Description"
      variant="solo"
      required
    ></v-textarea>
    <v-file-input
      v-model="workshopData.image"
      label="Workshop Image"
      variant="solo"
    ></v-file-input>
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

<style>
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
