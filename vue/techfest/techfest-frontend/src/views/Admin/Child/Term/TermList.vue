<script setup>
import { api } from '@/api';
import axios from 'axios';
import Cookies from 'js-cookie';
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toast-notification';

const loading = ref(false)
const termData = ref({})
const toast=useToast()
const config = ref({
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`
  }
})

onMounted(()=>{
  getTermData()
})

const getTermData=async()=> {
      try {
        loading.value = true
        const response = await axios.get(`${api()}/v1/terms`, config.value)
        if (response.status === 200) {
          termData.value = response.data
        } else {
          console.log('Something Went Wrong')
        }
      } catch (error) {
        console.log(error.message)
      } finally {
        loading.value = false
      }
    }

    const postTermData=async()=> {
      try {
        loading.value = true
        const response = await axios.post(`${api()}/v1/terms/create`, termData.value, config.value)
        if (response.status === 200) {
          this.termData.status = 'Draft'
          getTermData()
            toast.success('Successfully Created', {
            position: 'top-right'
          })
        } else {
            toast.error('Something Went Wrong', {
            position: 'top-right'
          })
        }
      } catch (error) {
        toast.error(error.response.data.error, {
          position: 'top-right'
        })
      } finally {
        loading.value = false
      }
    }

    const patchTermData=async()=> {
      try {
        loading.value = true
        const response = await axios.patch(`${api()}/v1/terms/update`, termData.value, config.value)
        if (response.status === 200) {
          toast.success(`Successfully ${termData.value.status}`, {
            position: 'top-right'
          })
        } else {
          toast.error('Something Went Wrong', {
            position: 'top-right'
          })
        }
      } catch (error) {
        toast.error(error.response.data.error, {
          position: 'top-right'
        })
      } finally {
        loading.value = false
      }
    }

   const createTerm=()=> {
      (termData.value.status = 'Draft'), 
      postTermData()
    }

    const publishTerm=()=> {
      termData.value.status = 'Published'
      patchTermData()
    }
    
   const saveDraft=()=> {
      termData.value.status = 'Draft'
      patchTermData()
    }


</script>
<template>
  <template v-if="loading">
    <v-container fluid fill-height class="d-flex justify-center align-center">
      <v-progress-circular indeterminate color="primary" size="64" width="6"></v-progress-circular>
    </v-container>
  </template>
  <template v-else>
    <v-form @submit.prevent="termData.id ? patchTermData : postTermData">
      <template v-if="termData.id">
        <p style="margin-bottom: 1rem; text-align: center; font-size: larger; color: red">
          Status :{{ termData.status }}
        </p>
      </template>
      <v-textarea
        v-model="termData.content"
        rows="20"
        label="Terms and Conditions"
        variant="solo"
      ></v-textarea>
      <template v-if="!termData.id">
        <v-btn @click="createTerm" type="submit" class="bg-warning">Create</v-btn>
      </template>
      <template v-else>
        <div class="buttons">
          <v-btn @click="publishTerm" type="button" class="bg-warning mr-3">Publish</v-btn>
          <v-btn @click="saveDraft" type="button" class="bg-success">Draft</v-btn>
        </div>
      </template>
    </v-form>
    <!-- {{ termData }} -->
  </template>
</template>

<style lang="scss" scoped>
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
