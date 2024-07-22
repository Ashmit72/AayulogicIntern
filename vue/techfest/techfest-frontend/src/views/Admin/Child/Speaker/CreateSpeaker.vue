<template lang="">
  <v-form @submit.prevent="submitForm">
    <v-text-field v-model="speakerData.name" label="Enter The Name" variant="solo" required></v-text-field>
    <v-text-field v-model="speakerData.position" label="Enter The Position" variant="solo" required></v-text-field>
    <v-text-field v-model="speakerData.facebook" label="Enter The Facebook Profile(URL)" variant="solo"></v-text-field>
    <v-text-field v-model="speakerData.linkedin" label="Enter The Linkedin Profile(URL)" variant="solo"></v-text-field>
    <v-text-field v-model="speakerData.twitter" label="Enter The Twitter Profile(URL)" variant="solo"></v-text-field>
    <v-textarea v-model="speakerData.description" label="Enter The Description" variant="solo" required></v-textarea>
    <v-file-input v-model="speakerData.image" clearable label="Speaker Image" variant="solo"></v-file-input>
    <div class="buttons">
      <v-btn @click="setStatus('Draft')" type="submit" class="bg-success" style="margin-right: 1rem">Draft</v-btn>
      <v-btn @click="setStatus('Published')" type="submit" class="bg-warning">Publish</v-btn>
    </div>
  </v-form>
</template>

<script>
import { api } from '@/api'
import axios from 'axios'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      id: this.$route.params.id,
      speakerData: {
        name: '',
        position: '',
        description: '',
        image: null,
        facebook: '',
        twitter: '',
        linkedin: '',
        status: ''
      },
      config: {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      }
    }
  },
  methods: {
    async getSpeakerDataById() {
      try {
        const response = await axios.get(`${api()}/v1/speaker/${this.id}`)
        if (response.status === 200) {
          this.speakerData = {
            ...response.data,
            image: response.data.speakerImage
          }
        }
      } catch (error) {
        this.$toast.error(error.response?.data?.error || 'Failed to fetch data', {
          position: 'top-right'
        })
      }
    },
    async submitForm() {
      if (this.id) {
        await this.patchSpeakerData()
      } else {
        await this.postSpeakerData()
      }
    },
    async postSpeakerData() {
      const form = new FormData()
      for (const key in this.speakerData) {
        form.append(key, this.speakerData[key])
      }
      try {
        const response = await axios.post(`${api()}/v1/speaker/create`, form, this.config)
        if (response.status === 200) {
          this.$router.push('/admin/speaker')
          this.resetForm()
        } else {
          this.$toast.error('Something Went Wrong!', {
            position: 'top-right'
          })
        }
      } catch (error) {
        this.$toast.error(error.response?.data?.error || 'Failed to submit data', {
          position: 'top-right'
        })
      }
    },
    async patchSpeakerData() {
      const form = new FormData()
      for (const key in this.speakerData) {
        form.append(key, this.speakerData[key])
      }
      try {
        const response = await axios.patch(`${api()}/v1/speaker/${this.id}`, form, this.config)
        if (response.status === 200) {
          this.$router.push('/admin/speaker')
          this.resetForm()
        } else {
          this.$toast.error('Something Went Wrong!', {
            position: 'top-right'
          })
        }
      } catch (error) {
        this.$toast.error(error.response?.data?.error || 'Failed to update data', {
          position: 'top-right'
        })
      }
    },
    setStatus(status) {
      this.speakerData.status = status
    },
    resetForm() {
      this.speakerData = {
        name: '',
        position: '',
        description: '',
        image: null,
        facebook: '',
        twitter: '',
        linkedin: '',
        status: ''
      }
    }
  },
  mounted() {
    if (this.id) {
      this.getSpeakerDataById()
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
