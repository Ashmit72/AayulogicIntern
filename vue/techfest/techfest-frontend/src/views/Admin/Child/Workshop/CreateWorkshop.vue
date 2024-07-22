<template lang="">
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

<script>
import { api } from '@/api';
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      id: this.$route.params.id,
      workshopData: {
        title: '',
        image: null,
        link: '',
        description: '',
        status: ''
      },
      config: {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      }
    };
  },
  methods: {
    async getWorkshopDataById() {
      try {
        const response = await axios.get(`${api()}/v1/workshop/${this.id}`);
        if (response.status === 200) {
          this.workshopData = {
            ...response.data,
            image: response.data.workshopImage
          };
        }
      } catch (error) {
        this.$toast.error(error.response?.data?.error || 'Failed to fetch data', {
          position: 'top-right'
        });
      }
    },
    async submitForm() {
      if (this.id) {
        await this.patchWorkshopData();
      } else {
        await this.postWorkshopData();
      }
    },
    async postWorkshopData() {
      const form = new FormData();
      for (const key in this.workshopData) {
        form.append(key, this.workshopData[key]);
      }
      try {
        const response = await axios.post(`${api()}/v1/workshop/create`, form, this.config);
        if (response.status === 200) {
          this.$router.push('/admin/workshop');
          this.resetForm();
        } else {
          this.$toast.error('Something Went Wrong!', {
            position: 'top-right'
          });
        }
      } catch (error) {
        this.$toast.error(error.response?.data?.error || 'Failed to submit data', {
          position: 'top-right'
        });
      }
    },
    async patchWorkshopData() {
      const form = new FormData();
      for (const key in this.workshopData) {
        form.append(key, this.workshopData[key]);
      }
      try {
        const response = await axios.patch(`${api()}/v1/workshop/${this.id}`, form, this.config);
        if (response.status === 200) {
          this.$router.push('/admin/workshop');
          this.resetForm();
        } else {
          this.$toast.error('Something Went Wrong!', {
            position: 'top-right'
          });
        }
      } catch (error) {
        this.$toast.error(error.response?.data?.error || 'Failed to update data', {
          position: 'top-right'
        });
      }
    },
    setStatus(status) {
      this.workshopData.status = status;
    },
    resetForm() {
      this.workshopData = {
        title: '',
        image: null,
        link: '',
        description: '',
        status: ''
      };
    }
  },
  mounted() {
    if (this.id) {
      this.getWorkshopDataById();
    }
  }
}
</script>

<style>
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
