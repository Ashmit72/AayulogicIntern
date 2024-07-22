<template>
  <template v-if="loading">
    <v-container fluid fill-height class="d-flex justify-center align-center">
      <v-progress-circular indeterminate color="primary" size="64" width="6"></v-progress-circular>
    </v-container>
  </template>
  <template v-else>
    <v-form @submit.prevent="termData.id ? patchTermData : postTermData">
      <template v-if="termData.id" >
      <p style="margin-bottom: 1rem;text-align: center;font-size: larger;color: red;" >Status :{{ termData.status }}</p>
    </template>
      <v-textarea v-model="termData.content" rows="20" label="Terms and Conditions" variant="solo"></v-textarea>
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

<script>
import { api } from '@/api';
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      loading: false,
      termData: {},
      config: {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      },
    };
  },
  methods: {
    async getTermData() {
      try {
        this.loading = true;
        const response = await axios.get(`${api()}/v1/terms`, this.config);
        if (response.status === 200) {
          this.termData = response.data;
        } else {
          console.log('Something Went Wrong');
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loading = false;
      }
    },
    async postTermData() {
      try {
        this.loading = true;
        const response = await axios.post(`${api()}/v1/terms/create`, this.termData, this.config);
        if (response.status === 200) {
          this.termData.status = 'Draft';
          this.getTermData()
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
    async patchTermData() {
      try {
        this.loading = true;
        const response = await axios.patch(`${api()}/v1/terms/update`, this.termData, this.config);
        if (response.status === 200) {
          this.$toast.success(`Successfully ${this.termData.status}`, {
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
     this.termData.status='Draft',
     console.log(this.termData.status);
     this.postTermData();
    },
    publishTerm() {
      this.termData.status = 'Published';
      this.patchTermData();
    },
    saveDraft() {
      this.termData.status = 'Draft';
      this.patchTermData();
    },
  },
  mounted() {
    this.getTermData();
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
