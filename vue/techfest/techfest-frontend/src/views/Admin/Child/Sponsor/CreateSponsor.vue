<template lang="">
  <v-form @submit.prevent="submitForm">
    <v-text-field 
      v-model="sponsorData.name"
      label="Enter the Name" 
      variant="solo"
      required
    ></v-text-field>

    <v-text-field 
      v-model="sponsorData.link"
      label="Enter the Link" 
      variant="solo"
      required
    ></v-text-field>
    
    <v-textarea 
      v-model="sponsorData.description"
      label="Enter the Description" 
      variant="solo"
      required
    ></v-textarea>
    
    <v-select
      v-model="sponsorData.level"
      type="number" 
      label="Enter the Level" 
      variant="solo"
      clearable
      item-value="id"
      :items="sponsorLevelList"
    ></v-select>
    
    <v-file-input 
      v-model="sponsorData.image" 
      label="Sponsor Image" 
      variant="solo"
      required
    ></v-file-input>
    
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
import { api } from '@/api';
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      id: this.$route.params.id,
      sponsorData: {
        name: '',
        image: null,
        level: null,
        link: '',
        description: '',
        status: ''
      },
      config: {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      },
      sponsorLevelList: []
    };
  },
  methods: {
    async getSponsorLevel(){
      axios.get(`${api()}/v1/sponsor-level?page=1&per_page=10`).then((res)=>{
        console.log(res.data.levels)
        this.sponsorLevelList = res.data.levels
      })
    },
    async getSponsorDataById() {
      try {
        const response = await axios.get(`${api()}/v1/sponsor/${this.id}`);
        if (response.status === 200) {
          this.sponsorData = {
            ...response.data,
            level:response.data.level,
            image: response.data.sponsorImage
          };
          console.log(this.sponsorData,"k cha")
        }
      } catch (error) {
        this.$toast.error(error.response?.data?.error || 'Failed to fetch data', {
          position: 'top-right'
        });
      }
    },
    async submitForm() {
      if (this.id) {
        await this.patchSponsorData();
      } else {
        await this.postSponsorData();
      }
    },
    async postSponsorData() {
      const form = new FormData();
      for (const key in this.sponsorData) {
        form.append(key, this.sponsorData[key]);
      }
      try {
        const response = await axios.post(`${api()}/v1/sponsor/create`, form, this.config);
        if (response.status === 200) {
          this.$router.push('/admin/sponsor');
          this.resetForm();
        } else {
          this.$toast.error('Something Went Wrong!', {
            position: 'top-right'
          });
        }
      } catch (error) {
        this.$toast.error(error.response?.data?.error || 'Failed to submit data', {
          position: 'top-right'
        });
      }
    },
    async patchSponsorData() {
      const form = new FormData();
      for (const key in this.sponsorData) {
        form.append(key, this.sponsorData[key]);
      }
      try {
        const response = await axios.patch(`${api()}/v1/sponsor/${this.id}`, form, this.config);
        if (response.status === 200) {
          this.$router.push('/admin/sponsor');
          this.resetForm();
        } else {
          this.$toast.error('Something Went Wrong!', {
            position: 'top-right'
          });
        }
      } catch (error) {
        this.$toast.error(error.response?.data?.error || 'Failed to update data', {
          position: 'top-right'
        });
      }
    },
    setStatus(status) {
      this.sponsorData.status = status;
    },
    resetForm() {
      this.sponsorData = {
        name: '',
        image: null,
        level: null,
        link: '',
        description: '',
        status: ''
      };
    }
  },
  mounted() {
    this.getSponsorLevel()
    if (this.id) {
      this.getSponsorDataById();
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
