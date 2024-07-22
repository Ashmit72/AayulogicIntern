<template>
  <v-form @submit.prevent="submitForm">
    <v-text-field
      v-model="levelData.title"
      label="Enter The Title"
      variant="solo"
      required
    ></v-text-field>
    <v-text-field
      v-model="levelData.priority"
      type="number"
      label="Enter The Priority (Number)"
      variant="solo"
      required
    ></v-text-field>
    <div class="buttons">
      <v-btn
        @click="setStatus('Draft')"
        type="submit"
        class="bg-success"
        style="margin-right: 1rem"
      >Draft</v-btn>
      <v-btn
        @click="setStatus('Published')"
        type="submit"
        class="bg-warning"
      >Publish</v-btn>
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
      levelData: {
        title: '',
        priority: null,
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
    async getLevelDataById() {
      try {
        const response = await axios.get(`${api()}/v1/sponsor-level/${this.id}`)
        if (response.status === 200) {
          this.levelData = { ...response.data }
        }
      } catch (error) {
        this.$toast.error(error.response?.data?.error || 'Failed to fetch data', {
          position: 'top-right'
        })
      }
    },
    async submitForm() {
      if (this.id) {
        await this.patchLevelData()
      } else {
        await this.postLevelData()
      }
    },
    async postLevelData() {
      try {
        const response = await axios.post(
          `${api()}/v1/sponsor-level/create`,
          this.levelData,
          this.config
        )
        if (response.status === 200) {
          this.$router.push('/admin/level')
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
    async patchLevelData() {
      try {
        const response = await axios.patch(
          `${api()}/v1/sponsor-level/${this.id}`,
          this.levelData,
          this.config
        )
        if (response.status === 200) {
          this.$router.push('/admin/level')
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
      this.levelData.status = status
    },
    resetForm() {
      this.levelData = {
        title: '',
        priority: null,
        status: ''
      }
    }
  },
  mounted() {
    if (this.id) {
      this.getLevelDataById()
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
