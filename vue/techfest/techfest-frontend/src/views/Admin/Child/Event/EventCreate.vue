<script setup>
      import { ref, onMounted } from 'vue'
      import { useRoute, useRouter } from 'vue-router'
      import axios from 'axios'
      import { api } from '@/api'
      import { useAdminEventStore } from '../../../../../store/admin/event';
      
      const route = useRoute()
      const router = useRouter()
      const event=useAdminEventStore()
      const id = route.params.id
      
      const valid = ref(false)
      const eventData = ref({
        title: '',
        link: '',
        image: null,
        description: '',
        status: ''
      })
      
 
      
      const rules = {
        title: [
          v => !!v || 'Title is required',
          v => (v && v.length <= 10) || 'Title must be less than 10 characters'
        ],
        description: [
          v => !!v || 'Description is required',
          v => (v && v.length >= 10) || 'Description must be more than 10 characters'
        ]
      }
      
      const fetchEventData = async () => {
        try {
          const response = await axios.get(`${api()}/v1/event/${id}`, event.config)
          if (response.status === 200) {
            eventData.value = { ...response.data, image: response.data.eventImage }
          }
        } catch (error) {
          console.error(error.response?.data?.error || 'Failed to fetch data')
        }
      }
      
      const submitForm = async () => {
        const form = new FormData()
        for (const key in eventData.value) {
          form.append(key, eventData.value[key])
        }
        if (valid.value) {
          if (id) {
            await patchEventData(form)
          } else {
            await postEventData(form)
          }
        }
      }
      
      const postEventData = async (form) => {
        try {
          const response = await axios.post(`${api()}/v1/event/create`, form, event.config)
          if (response.data.success) {
            resetForm()
            router.push('/admin/event')
          } else {
            console.error('Something Went Wrong!')
          }
        } catch (error) {
          console.error(error.message)
        }
      }
      
      const patchEventData = async (form) => {
        try {
          const response = await axios.patch(`${api()}/v1/event/${id}`, form, event.config)
          if (response.data.success) {
            resetForm()
            router.push('/admin/event')
          } else {
            console.error('Something Went Wrong!')
          }
        } catch (error) {
          console.error(error.message)
        }
      }
      
      const resetForm = () => {
        eventData.value = {
          title: '',
          link: '',
          image: null,
          description: '',
          status: ''
        }
      }
      
      onMounted(() => {
        if (id) {
          fetchEventData()
        }
      })
</script>
<template>
  <v-form v-model="valid" ref="createEventForm" @submit.prevent="submitForm">
    <v-text-field :rules="rules.title" v-model="eventData.title" label="Enter Your Title" variant="solo"></v-text-field>
    <v-textarea :rules="rules.description" v-model="eventData.description" label="Enter The Description" variant="solo"></v-textarea>
    <v-text-field v-model="eventData.link" label="Enter The Link" variant="solo"></v-text-field>
    <v-file-input v-model="eventData.image" accept="image/*" density="compact" clearable label="Event Image" variant="solo-filled"></v-file-input>
    <div class="buttons">
      <v-btn class="bg-success" type="submit" @click="eventData.status = 'Draft'">Draft</v-btn>
      <v-btn class="bg-warning" type="submit" @click="eventData.status = 'Published'">Publish</v-btn>
    </div>
  </v-form>
</template>


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
