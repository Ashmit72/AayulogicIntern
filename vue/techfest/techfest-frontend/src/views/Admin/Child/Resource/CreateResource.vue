<template lang="">
  <v-form @submit.prevent="handleSubmit">
    <!-- {{resourceData.file}} -->
    <v-text-field
      v-model="resourceData.title"
      label="Enter the Title"
      variant="solo"
    ></v-text-field>
    <v-file-input
      clearable
      v-model="resourceData.file"
      label="File input"
      variant="solo"
    ></v-file-input>
    <div class="buttons">
      <v-btn
        @click="resourceData.status = 'Draft'"
        type="submit"
        class="bg-success"
        style="margin-right: 1rem"
        >Draft</v-btn
      >
      <v-btn @click="resourceData.status = 'Published'" type="submit" class="bg-warning"
        >Publish
      </v-btn>
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
      resourceData: {
        title: '',
        file: null,
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
    async getResourceDataById() {
      const form = new FormData()
      for (const key in this.resourceData) {
        form.append(key, this.resourceData[key])
      }
      try {
        const response = await axios.get(`${api()}/v1/resource/${this.id}`, this.config)
        if (response.status === 200) {
          this.resourceData = {
            ...response.data.resource,
            file:response.data.resource.file_info
          }
        }
      } catch (error) {
        this.$toast.error(error.response?.data?.error || 'Failed to fetch data', {
          position: 'top-right'
        })
      }
    },
    async postResourceData() {
      const form = new FormData()
      for (const key in this.resourceData) {
        form.append(key, this.resourceData[key])
      }
      try {
        const response = await axios.post(`${api()}/v1/resource/create`, form, this.config)
        if (response.status === 200) {
          this.$router.push('/admin/resource')
        } else {
          this.$toast.error('Something Went Wrong', {
            position: 'top-right'
          })
        }
      } catch (error) {
        this.$toast.error(error.response.data.error, {
          position: 'top-right'
        })
      }
    },
    async pathcResourceData() {
      const form = new FormData()
      for (const key in this.resourceData) {
        form.append(key, this.resourceData[key])
      }
      try {
        const response = await axios.patch(`${api()}/v1/resource/${this.id}`, form, this.config)
        if (response.status === 200) {
          this.$router.push('/admin/resource')
        }
      } catch (error) {
        this.$toast.error(error.response.data.error, {
          position: 'top-right'
        })
      }
    },
    async handleSubmit() {
      if (this.id) {
        this.pathcResourceData()
      }
      else{
        this.postResourceData()
      }
    }
  },
  mounted() {
    if (this.id) {
      this.getResourceDataById()
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
