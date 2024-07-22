<template lang="">
  <v-form v-model="valid" ref="createEventForm" @submit.prevent="submitForm">
    <v-text-field :rules="rules.title" v-model="eventData.title" label="Enter Your Title" variant="solo"></v-text-field>
    <v-textarea :rules="rules.excerpt" v-model="eventData.description" label="Enter The Description" variant="solo"></v-textarea>
    <v-text-field v-model="eventData.link" label="Enter The Link" variant="solo"></v-text-field>
    <v-file-input v-model="eventData.image" accept="image/*" density="compact" clearable label="Event Image" variant="solo-filled"></v-file-input>
    <div class="buttons">
      <v-btn class="bg-success" type="submit" @click="eventData.status = 'Draft'">Draft</v-btn>
      <v-btn class="bg-warning" type="submit" @click="eventData.status = 'Published'">Publish</v-btn>
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
      eventData: {
        title: '',
        link: '',
        image: null,
        description: '',
        status: ''
      },
      config: {
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      },
      rules: {
        title: [
          v => !!v || 'Title is required',
          v => (v && v.length <= 10) || 'Title must be less than 10 characters',
        ],
        excerpt: [
          v => !!v || 'Excerpt is required',
          v => (v && v.length >= 10) || 'Excerpt must be more than 10 characters',
        ]
      }
    }
  },
  methods: {
    async fetchEventData() {
      try {
        const response = await axios.get(`${api()}/v1/event/${this.id}`, this.config);
        if (response.status === 200) {
          this.eventData = { ...response.data,image:response.data.eventImage };
        }
      } catch (error) {
        this.$toast.error(error.response?.data?.error || 'Failed to fetch data', {
          position: 'top-right'
        });
      }
    },
    async submitForm() {
      const { valid } = await this.$refs.createEventForm.validate();
      const form = new FormData();
      for (const key in this.eventData) {
        form.append(key, this.eventData[key]);
      }
      if (valid) {
        if (this.id) {
          await this.patchEventData(form);
        } else {
          await this.postEventData(form);
        }
      }
    },
    async postEventData(form) {
      try {
        const response = await axios.post(`${api()}/v1/event/create`, form, this.config);
        if (response.data.success) {
          this.resetForm();
          this.$router.push('/admin/event');
        } else {
          this.$toast.error('Something Went Wrong!', {
            position: 'top-right'
          });
        }
      } catch (error) {
        this.$toast.error(error.message, {
          position: 'top-right'
        });
      }
    },
    async patchEventData(form) {
      try {
        const response = await axios.patch(`${api()}/v1/event/${this.id}`, form, this.config);
        if (response.data.success) {
          this.resetForm();
          this.$router.push('/admin/event');
        } else {
          this.$toast.error('Something Went Wrong!', {
            position: 'top-right'
          });
        }
      } catch (error) {
        this.$toast.error(error.message, {
          position: 'top-right'
        });
      }
    },
    setStatus(status) {
      this.eventData.status = status;
    },
    resetForm() {
      this.eventData = {
        title: '',
        link: '',
        image: null,
        description: '',
        status: ''
      };
    }
  },
  mounted() {
    if (this.id) {
      this.fetchEventData();
    }
  }
}
</script>

<style scoped>
.buttons {
  width: 100%;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>
