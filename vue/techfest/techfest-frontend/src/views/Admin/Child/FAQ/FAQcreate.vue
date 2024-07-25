<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import Cookies from 'js-cookie'
import { api } from '@/api'

const route = useRoute()
const router = useRouter()

const id = route.params.id
const faqData = ref({
  title: '',
  content: '',
  status: ''
})
const config = {
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`
  }
}

const getFaqDataById = async () => {
  try {
    const response = await axios.get(`${api()}/v1/faq/${id}`, config)
    if (response.status === 200) {
      faqData.value = { ...response.data }
    }
  } catch (error) {
    // Handle the error here
    // For example, using a toast or alert
    console.error(error.response?.data?.error || 'Failed to fetch data')
  }
}

const submitData = async () => {
  if (id) {
    await patchFaqData()
  } else {
    await postFaqData()
  }
}

const postFaqData = async () => {
  try {
    const response = await axios.post(`${api()}/v1/faq/create`, faqData.value, config)
    if (response.status === 200) {
      resetForm()
      router.push('/admin/faq')
    } else {
      console.error('Something Went Wrong!')
    }
  } catch (error) {
    console.error(error.message)
  }
}

const patchFaqData = async () => {
  try {
    const response = await axios.patch(`${api()}/v1/faq/${id}`, faqData.value, config)
    if (response.status === 200) {
      resetForm()
      router.push('/admin/faq')
    } else {
      console.error('Something Went Wrong!')
    }
  } catch (error) {
    console.error(error.message)
  }
}

const setStatus = (status) => {
  faqData.value.status = status
}

const resetForm = () => {
  faqData.value = {
    title: '',
    content: '',
    status: ''
  }
}

onMounted(() => {
  if (id) {
    getFaqDataById()
  }
})
</script>

<template>
  <v-form @submit.prevent="submitData" style="transform: translateY(100px)">
    <v-row>
      <v-col cols="12">
        <h1 style="text-align: center; font-weight: 400">Add Your Details</h1>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="faqData.title"
          label="Enter Your Question"
          variant="solo-filled"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="faqData.content"
          label="Enter Your Answer"
          variant="solo-filled"
        ></v-textarea>
      </v-col>
      <v-col cols="12" class="btn-container">
        <v-btn
          @click="setStatus('Draft')"
          type="submit"
          class="bg-success"
          style="margin-right: 1rem"
          >Draft</v-btn
        >
        <v-btn @click="setStatus('Published')" type="submit" class="bg-warning">Publish</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<style scoped lang="scss">
.btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>
