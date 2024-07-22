<template lang="">
  <v-form @submit.prevent="handleSubmit" >
    
    <v-text-field 
    v-model="roleData.title" 
    label="Enter the Title" 
    variant="solo"
    ></v-text-field>

    <v-text-field
      v-model="roleData.level"
      type="number"
      label="Enter the level"
      variant="solo"
    ></v-text-field>
    
    <div class="buttons">
      <v-btn
        @click="roleData.status = 'Draft'"
        type="submit"
        class="bg-success"
        style="margin-right: 1rem"
        >Draft</v-btn
      >
      <v-btn @click="roleData.status = 'Published'" type="submit" class="bg-warning"
        >Publish
      </v-btn>
    </div>
  </v-form>
</template>
<script>
import { api } from '@/api';
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      id:this.$route.params.id,
      roleData: {
        title: '',
        level: null,
        status: ''
      },
      config: {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      },
    }
  },
  mounted(){
    if (this.id) {
      this.getRoleDataById()
    }
  },
  methods: {
    async getRoleDataById(){
      try {
        const response=await axios.get(`${api()}/v1/role/${this.id}`)
        if (response.status===200) {
          this.roleData={
             ...response.data,
          }
        }
      } catch (error) {
        this.$toast.error(error.response?.data?.error || 'Failed to fetch data', {
          position: 'top-right'
        })
      }
    },
    async postRoleData() {
      try {
        const response=await axios.post(`${api()}/v1/role/create`,this.roleData,this.config)
        if (response.status===200) {
            this.$router.push('/admin/role')
        }
        else{
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
    async patchRoleData(){
      try {
        const response=await axios.patch(`${api()}/v1/role/${this.id}`,this.roleData,this.config)
        if (response.status===200) {
          this.$router.push('/admin/role')
        }
        else{
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
    async handleSubmit(){
      if (this.id) {
        this.patchRoleData()
      }
      else{
        this.postRoleData()
      }
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
