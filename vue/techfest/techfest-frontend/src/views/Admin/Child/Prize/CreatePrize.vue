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

<script>
import { api } from '@/api'
import axios from 'axios'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      id: this.$route.params.id,
      prizeData: {
        title: '',
        image: null,
        description: '',
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
    async getPrizeDataById() {
      try {
        const response = await axios.get(`${api()}/v1/prize/${this.id}`)
        if (response.status === 200) {
          this.prizeData = {
            ...response.data,
            image: response.data.prizeImage
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
        await this.patchPrizeData()
      } else {
        await this.postPrizeData()
      }
    },
    async postPrizeData() {
      const form = new FormData()
      for (const key in this.prizeData) {
        form.append(key, this.prizeData[key])
      }
      try {
        const response = await axios.post(`${api()}/v1/prize/create`, form, this.config)
        if (response.status === 200) {
          this.$router.push('/admin/prize')
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
    async patchPrizeData() {
      const form = new FormData()
      for (const key in this.prizeData) {
        form.append(key, this.prizeData[key])
      }
      try {
        const response = await axios.patch(`${api()}/v1/prize/${this.id}`, form, this.config)
        if (response.status === 200) {
          this.$router.push('/admin/prize')
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
      this.prizeData.status = status
    },
    resetForm() {
      this.prizeData = {
        title: '',
        image: null,
        description: '',
        status: ''
      }
    }
  },
  mounted() {
    if (this.id) {
      this.getPrizeDataById()
    }
  }
}
</script>

<style scoped>
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
