<script setup>
import { api } from '@/api';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const id = ref(route.params.id);
const form = ref({
  name: '',
  email: '',
  role: '',
  leader: false,
  description: '',
  status: '',
  image: null,
});
const rules = {
  name: [
    v => !!v || 'Name is required',
    v => (v && v.length <= 10) || 'Name must be less than 10 characters',
  ],
  email: [v => !!v || 'Email is required'],
  description: [
    v => !!v || 'Description is required',
    v => (v && v.length > 10) || 'Description must be more than 10 characters',
  ],
  image: [
    v => !v || !v.length || v[0].size < 2000000 || 'Image size should be less than 2 MB!',
  ],
  role: [v => !!v || 'Role is required'],
  leader: [v => v !== null || 'Leader is required'],
};
const config = {
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`,
  },
};
const roles = ref([]);

const validateForm = async () => {
  const { valid } = await teamFormRef.value.validate();
  return valid;
};

const getTeamInfo = async () => {
  try {
    const res = await axios.get(`${api()}/v1/team/${id.value}`);
    form.value = {
      ...res.data,
      image: res.data.memberImage,
    };
  } catch (error) {
    console.error(error);
  }
};

const getRoleData = async () => {
  try {
    const response = await axios.get(`${api()}/v1/role?per_page=10&page=1`);
    if (response.data.roles) {
      roles.value = response.data.roles;
    } else {
      toast.error('Something Went Wrong', { position: 'top-right' });
    }
  } catch (error) {
    toast.error(error.message, { position: 'top-right' });
  }
};

const handleSubmit = async () => {
  if (await validateForm()) {
    id.value ? patchTeam() : postTeamData();
  }
};

const patchTeam = async () => {
  const teamData = createFormData();
  try {
    const response = await axios.patch(`${api()}/v1/team/${id.value}`, teamData, config);
    if (response.status === 200) {
      router.push('/admin/team');
    } else {
      toast.error('Something Went Wrong!', { position: 'top-right' });
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error, { position: 'top-right' });
  }
};

const postTeamData = async () => {
  const teamData = createFormData();
  try {
    const response = await axios.post(`${api()}/v1/team/create`, teamData, config);
    if (response.status === 200) {
      router.push('/admin/team');
    } else {
      toast.error('Something Went Wrong!', { position: 'top-right' });
    }
  } catch (error) {
    toast.error(error.response.data.error, { position: 'top-right' });
  }
};

const createFormData = () => {
  const teamData = new FormData();
  Object.keys(form.value).forEach(key => {
    teamData.append(key, form.value[key]);
  });
  return teamData;
};

const setStatus = status => {
  form.value.status = status;
};

onMounted(() => {
  if (id.value) {
    getTeamInfo();
  }
  getRoleData();
});

const teamFormRef = ref(null);
</script>

<template>
  <v-form ref="teamFormRef" @submit.prevent="handleSubmit">
    <v-text-field
      v-model="form.name"
      label="Enter The Name"
      variant="solo"
      :rules="rules.name"
    ></v-text-field>
    <v-text-field
      v-model="form.email"
      type="email"
      label="Enter The Email"
      variant="solo"
      :rules="rules.email"
    ></v-text-field>
    <v-radio-group v-model="form.leader" inline label="Leader">
      <v-radio label="True" :value="true"></v-radio>
      <v-radio label="False" :value="false"></v-radio>
    </v-radio-group>
    <v-select
      v-model="form.role"
      label="Select Role"
      variant="solo"
      clearable
      :items="roles"
      :rules="rules.role"
      item-value="id"
    ></v-select>
    <v-textarea
      v-model="form.description"
      label="Enter the Description"
      variant="solo"
      :rules="rules.description"
    ></v-textarea>
    <v-file-input
      v-model="form.image"
      label="Member Image"
      variant="solo"
      clearable
      :rules="rules.image"
    ></v-file-input>
    <div class="buttons">
      <v-btn @click="setStatus('Draft')" type="submit" class="bg-success" style="margin-right: 1rem"
        >Draft</v-btn
      >
      <v-btn @click="setStatus('Published')" type="submit" class="bg-warning">Publish</v-btn>
    </div>
  </v-form>
</template>

<style scoped>
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
