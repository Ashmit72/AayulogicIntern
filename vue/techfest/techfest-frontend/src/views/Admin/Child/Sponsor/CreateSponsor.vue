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

const sponsorData = ref({
  name: '',
  image: null,
  level: null,
  link: '',
  description: '',
  status: ''
});

const sponsorLevelList = ref([]);
const config = {
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`
  }
};

const getSponsorLevel = async () => {
  try {
    const res = await axios.get(`${api()}/v1/sponsor-level?page=1&per_page=10`);
    sponsorLevelList.value = res.data.levels;
  } catch (error) {
    toast.error('Failed to fetch sponsor levels', { position: 'top-right' });
  }
};

const getSponsorDataById = async () => {
  try {
    const response = await axios.get(`${api()}/v1/sponsor/${id}`);
    if (response.status === 200) {
      sponsorData.value = {
        ...response.data,
        level: response.data.level,
        image: response.data.sponsorImage
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
    await patchSponsorData();
  } else {
    await postSponsorData();
  }
};

const postSponsorData = async () => {
  const form = new FormData();
  for (const key in sponsorData.value) {
    form.append(key, sponsorData.value[key]);
  }
  try {
    const response = await axios.post(`${api()}/v1/sponsor/create`, form, config);
    if (response.status === 200) {
      router.push('/admin/sponsor');
      resetForm();
    } else {
      toast.error('Something Went Wrong!', { position: 'top-right' });
    }
  } catch (error) {
    toast.error(error.response?.data?.error || 'Failed to submit data', {
      position: 'top-right'
    });
  }
};

const patchSponsorData = async () => {
  const form = new FormData();
  for (const key in sponsorData.value) {
    form.append(key, sponsorData.value[key]);
  }
  try {
    const response = await axios.patch(`${api()}/v1/sponsor/${id}`, form, config);
    if (response.status === 200) {
      router.push('/admin/sponsor');
      resetForm();
    } else {
      toast.error('Something Went Wrong!', { position: 'top-right' });
    }
  } catch (error) {
    toast.error(error.response?.data?.error || 'Failed to update data', {
      position: 'top-right'
    });
  }
};

const setStatus = (status) => {
  sponsorData.value.status = status;
};

const resetForm = () => {
  sponsorData.value = {
    name: '',
    image: null,
    level: null,
    link: '',
    description: '',
    status: ''
  };
};

onMounted(() => {
  getSponsorLevel();
  if (id) {
    getSponsorDataById();
  }
});
</script>

<template>
  <v-form @submit.prevent="submitForm">
    <v-text-field 
      v-model="sponsorData.name"
      label="Enter the Name" 
      variant="solo"
      required
    ></v-text-field>

    <v-text-field 
      v-model="sponsorData.link"
      label="Enter the Link" 
      variant="solo"
      required
    ></v-text-field>
    
    <v-textarea 
      v-model="sponsorData.description"
      label="Enter the Description" 
      variant="solo"
      required
    ></v-textarea>
    
    <v-select
      v-model="sponsorData.level"
      type="number" 
      label="Enter the Level" 
      variant="solo"
      clearable
      item-value="id"
      :items="sponsorLevelList"
    ></v-select>
    
    <v-file-input 
      v-model="sponsorData.image" 
      label="Sponsor Image" 
      variant="solo"
      required
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
