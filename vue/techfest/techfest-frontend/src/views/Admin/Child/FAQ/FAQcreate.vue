<template lang="">
  <v-form @submit.prevent="submitData" style="transform: translateY(100px)">
    <v-row>
      <v-col cols="12">
        <h1 style="text-align: center; font-weight: 400">Add Your Details</h1>
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="faqData.title" label="Enter Your Question" variant="solo-filled"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-textarea v-model="faqData.content" label="Enter Your Answer" variant="solo-filled"></v-textarea>
      </v-col>
      <v-col cols="12" class="btn-container">
        <v-btn @click="setStatus('Draft')" type="submit" class="bg-success" style="margin-right: 1rem">Draft</v-btn>
        <v-btn @click="setStatus('Published')" type="submit" class="bg-warning">Publish</v-btn>
      </v-col>
    </v-row>
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
      faqData: {
        title: '',
        content: '',
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
    async getFaqDataById() {
      try {
        const response = await axios.get(`${api()}/v1/faq/${this.id}`, this.config)
        if (response.status === 200) {
          this.faqData = { ...response.data }
        }
      } catch (error) {
        this.$toast.error(error.response?.data?.error || 'Failed to fetch data', {
          position: 'top-right'
        })
      }
    },
    async submitData() {
      if (this.id) {
        await this.patchFaqData()
      } else {
        await this.postFaqData()
      }
    },
    async postFaqData() {
      try {
        const response = await axios.post(`${api()}/v1/faq/create`, this.faqData, this.config)
        if (response.status === 200) {
          this.resetForm()
          this.$router.push('/admin/faq')
        } else {
          this.$toast.error('Something Went Wrong!', {
            position: 'top-right'
          })
        }
      } catch (error) {
        this.$toast.error(error.message, {
          position: 'top-right'
        })
      }
    },
    async patchFaqData() {
      try {
        const response = await axios.patch(`${api()}/v1/faq/${this.id}`, this.faqData, this.config)
        if (response.status === 200) {
          this.resetForm()
          this.$router.push('/admin/faq')
        } else {
          this.$toast.error('Something Went Wrong!', {
            position: 'top-right'
          })
        }
      } catch (error) {
        this.$toast.error(error.message, {
          position: 'top-right'
        })
      }
    },
    setStatus(status) {
      this.faqData.status = status
    },
    resetForm() {
      this.faqData = {
        title: '',
        content: '',
        status: ''
      }
    }
  },
  mounted() {
    if (this.id) {
      this.getFaqDataById()
    }
  }
}
</script>

<style scoped lang="scss">
.btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>
