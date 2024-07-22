<template>
  <template v-if="loading">
    <v-container fluid fill-height class="d-flex justify-center align-center">
      <v-progress-circular indeterminate color="primary" size="64" width="6"></v-progress-circular>
    </v-container>
  </template>
  <template v-else>
    <v-form @submit.prevent="privacyData.id ? patchprivacyData : postprivacyData">
      <template v-if="privacyData.id" >
      <p style="margin-bottom: 1rem;text-align: center;font-size: larger;color: red;" >Status :{{ privacyData.status }}</p>
    </template>
      <v-textarea v-model="privacyData.content" rows="20" label="Privacy and Policies" variant="solo"></v-textarea>
      <template v-if="!privacyData.id">
        <v-btn @click="createTerm" type="submit" class="bg-warning">Create</v-btn>
      </template>
      <template v-else>
        <div class="buttons">
          <v-btn @click="publishTerm" type="button" class="bg-warning mr-3">Publish</v-btn>
          <v-btn @click="saveDraft" type="button" class="bg-success">Draft</v-btn>
        </div>
      </template>
    </v-form>
    <!-- {{ privacyData }} -->
  </template>
</template>

<script>
import { api } from '@/api';
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      loading: false,
      privacyData: {},
      config: {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      },
    };
  },
  methods: {
    async getprivacyData() {
      try {
        this.loading = true;
        const response = await axios.get(`${api()}/v1/privacy`, this.config);
        if (response.status === 200) {
          this.privacyData = response.data;
        } else {
          console.log('Something Went Wrong');
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loading = false;
      }
    },
    async postprivacyData() {
      try {
        this.loading = true;
        const response = await axios.post(`${api()}/v1/privacy/create`, this.privacyData, this.config);
        if (response.status === 200) {
          this.privacyData.status = 'Draft';
          this.getprivacyData()
          this.$toast.success('Successfully Created', {
            position: 'top-right'
          });
        } else {
          this.$toast.error('Something Went Wrong', {
            position: 'top-right'
          });
        }
      } catch (error) {
        this.$toast.error(error.response.data.error, {
          position: 'top-right'
        });
      } finally {
        this.loading = false;
      }
    },
    async patchprivacyData() {
      try {
        this.loading = true;
        const response = await axios.patch(`${api()}/v1/privacy/update`, this.privacyData, this.config);
        if (response.status === 200) {
          this.$toast.success(`Successfully ${this.privacyData.status}`, {
            position: 'top-right'
          });
        } else {
          this.$toast.error('Something Went Wrong', {
            position: 'top-right'
          });
        }
      } catch (error) {
        this.$toast.error(error.response.data.error, {
          position: 'top-right'
        });
      } finally {
        this.loading = false;
      }
    },
    createTerm(){
     this.privacyData.status='Draft',
     console.log(this.privacyData.status);
     this.postprivacyData();
    },
    publishTerm() {
      this.privacyData.status = 'Published';
      this.patchprivacyData();
    },
    saveDraft() {
      this.privacyData.status = 'Draft';
      this.patchprivacyData();
      
    },
  },
  mounted() {
    // alert("this")
    this.getprivacyData();
  },unmounted(){

  }
};
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
