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

<script>
import { api } from '@/api';
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      id: this.$route.params.id,
      form: {
        name: '',
        email: '',
        role: '',
        leader: false,
        description: '',
        status: '',
        image: null,
      },
      rules: {
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
          v=>!v || !v.length || v[0].size < 2000000 || 'Image size should be less than 2 MB!'
        ],
        role: [v => !!v || 'Role is required'],
        leader: [v => v !== null || 'Leader is required'],
      },
      config: {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      },
      roles: [],
    };
  },
  mounted() {
    if (this.id) {
      this.getTeamInfo();
    }
    this.getRoleData();
  },
  methods: {
    async validateForm() {
      const { valid } = await this.$refs.teamFormRef.validate();
      return valid;
    },
    async getTeamInfo() {
      try {
        const res = await axios.get(`${api()}/v1/team/${this.id}`);
        this.form = {
          ...res.data,
          image: res.data.memberImage,
        };
      } catch (error) {
        console.error(error);
      }
    },
    async getRoleData() {
      try {
        const response = await axios.get(`${api()}/v1/role?per_page=10&page=1`);
        if (response.data.roles) {
          this.roles = response.data.roles;
        } else {
          this.$toast.error('Something Went Wrong', { position: 'top-right' });
        }
      } catch (error) {
        this.$toast.error(error.message, { position: 'top-right' });
      }
    },
    async handleSubmit() {
      if (await this.validateForm()) {
        this.id ? this.patchTeam() : this.postTeamData();
      }
    },
    async patchTeam() {
      const teamData = this.createFormData();
      try {
        const response = await axios.patch(`${api()}/v1/team/${this.id}`, teamData, this.config);
        if (response.status === 200) {
          this.$router.push('/admin/team');
        } else {
          this.$toast.error('Something Went Wrong!', { position: 'top-right' });
        }
      } catch (error) {
        console.error(error);
        this.$toast.error(error.response.data.error, { position: 'top-right' });
      }
    },
    async postTeamData() {
      const teamData = this.createFormData();
      try {
        const response = await axios.post(`${api()}/v1/team/create`, teamData, this.config);
        if (response.status === 200) {
          this.$router.push('/admin/team');
        } else {
          this.$toast.error('Something Went Wrong!', { position: 'top-right' });
        }
      } catch (error) {
        this.$toast.error(error.response.data.error, { position: 'top-right' });
      }
    },
    createFormData() {
      const teamData = new FormData();
      Object.keys(this.form).forEach(key => {
        teamData.append(key, this.form[key]);
      });
      return teamData;
    },
    setStatus(status) {
      this.form.status = status;
    },
  },
};
</script>

<style scoped>
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
