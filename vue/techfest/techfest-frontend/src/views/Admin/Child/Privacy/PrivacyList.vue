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
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import { api } from '@/api';
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  setup() {
    const loading = ref(false);
    const privacyData = ref({});
    const toast = useToast();

    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const getprivacyData = async () => {
      try {
        loading.value = true;
        const response = await axios.get(`${api()}/v1/privacy`, config);
        if (response.status === 200) {
          privacyData.value = response.data;
        } else {
          console.log('Something Went Wrong');
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        loading.value = false;
      }
    };

    const postprivacyData = async () => {
      try {
        loading.value = true;
        const response = await axios.post(`${api()}/v1/privacy/create`, privacyData.value, config);
        if (response.status === 200) {
          privacyData.value.status = 'Draft';
          getprivacyData();
          toast.success('Successfully Created', {
            position: 'top-right',
          });
        } else {
          toast.error('Something Went Wrong', {
            position: 'top-right',
          });
        }
      } catch (error) {
        toast.error(error.response.data.error, {
          position: 'top-right',
        });
      } finally {
        loading.value = false;
      }
    };

    const patchprivacyData = async () => {
      try {
        loading.value = true;
        const response = await axios.patch(`${api()}/v1/privacy/update`, privacyData.value, config);
        if (response.status === 200) {
          toast.success(`Successfully ${privacyData.value.status}`, {
            position: 'top-right',
          });
        } else {
          toast.error('Something Went Wrong', {
            position: 'top-right',
          });
        }
      } catch (error) {
        toast.error(error.response.data.error, {
          position: 'top-right',
        });
      } finally {
        loading.value = false;
      }
    };

    const createTerm = () => {
      privacyData.value.status = 'Draft';
      console.log(privacyData.value.status);
      postprivacyData();
    };

    const publishTerm = () => {
      privacyData.value.status = 'Published';
      patchprivacyData();
    };

    const saveDraft = () => {
      privacyData.value.status = 'Draft';
      patchprivacyData();
    };

    onMounted(() => {
      getprivacyData();
    });

    return {
      loading,
      privacyData,
      createTerm,
      publishTerm,
      saveDraft,
      postprivacyData,
      patchprivacyData,
    };
  },
};
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
