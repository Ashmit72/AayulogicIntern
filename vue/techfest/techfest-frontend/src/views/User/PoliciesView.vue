<script setup >
import { api } from '@/api';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toast-notification';

const privacyData=ref('')
const toast=useToast()
onMounted(()=>{
  getTerms()
})

const getTerms=async()=> {
      try {
        const response = await axios.get(`${api()}/v1/privacy`)
        if (response.status === 200) {
         privacyData.value=response.data.content
        }
        else{
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
      <span class="font-weight-black">Privacies and Policies</span>
    </template>

    <v-card-text class="bg-surface-light pt-4">
     {{ privacyData || 'No Privacies and Policies' }}
    </v-card-text>
  </v-card>
</template>
<style scoped>
.conditions {
  transform: translateY(100px);
}
</style>
