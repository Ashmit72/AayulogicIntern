<script setup >
import { api } from '@/api';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toast-notification';
const toast=useToast()
 const faq= ref([])
 onMounted(()=>{
  fetchFAQ()
 })

 const fetchFAQ=async()=> {
      try {
        const response = await axios.get(`${api()}/v1/frontend/faqs`)
        if (response.status === 200) {
          faq.value = response.data.map((question) => ({
            ...question,
            show: false
          }))
        } else {
          toast.error('Something went wrong', {
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
  <v-container v-for="(question, index) in faq" :key="question.id">
    <v-expansion-panels>
      <v-expansion-panel :id="question.id" :title="question.title" :text="question.content">
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<style scoped lang="scss">
.question-box {
  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
}
</style>
