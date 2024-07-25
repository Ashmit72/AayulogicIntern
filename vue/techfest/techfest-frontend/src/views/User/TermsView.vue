<script setup>
import { api } from '@/api'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toast-notification'

const toast = useToast()

const termsData = ref('')
onMounted(() => {
  getTerms()
})
const getTerms = async () => {
  try {
    const response = await axios.get(`${api()}/v1/terms`)
    if (response.status === 200) {
      termsData.value = response.data.content
    } else {
      toast.error('Something Went Wrong', {
        position: 'top-right'
      })
    }
  } catch (error) {
    toast.error(error.message, {
      position: 'top-right'
    })
  }
}
</script>
<template>
  <v-card class="mx-auto conditions">
    <template v-slot:title>
      <span class="font-weight-black">Terms and Conditions</span>
    </template>
    <v-card-text class="bg-surface-light pt-4">
      {{ termsData || 'No Terms and Conditions' }}
    </v-card-text>
  </v-card>
</template>

<style scoped>
.conditions {
  transform: translateY(100px);
}
</style>
