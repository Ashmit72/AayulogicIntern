<script setup>
import { onMounted } from 'vue'
import { useAdminPrivacyStore } from '../../../../../store/admin/privacy';

const privacy=useAdminPrivacyStore()

onMounted(() => {
  privacy.getprivacyData()
})
</script>
<template>
  <template v-if="privacy.loading">
    <v-container fluid fill-height class="d-flex justify-center align-center">
      <v-progress-circular indeterminate color="primary" size="64" width="6"></v-progress-circular>
    </v-container>
  </template>
  <template v-else>
    <v-form @submit.prevent="privacy.privacyData.id ? privacy.patchprivacyData : privacy.postprivacyData">
      <template v-if="privacy.privacyData.id">
        <p style="margin-bottom: 1rem; text-align: center; font-size: larger; color: red">
          Status :{{ privacy.privacyData.status }}
        </p>
      </template>
      <v-textarea
        v-model="privacy.privacyData.content"
        rows="20"
        label="Privacy and Policies"
        variant="solo"
      ></v-textarea>
      <template v-if="!privacy.privacyData.id">
        <v-btn @click="privacy.createTerm" type="submit" class="bg-warning">Create</v-btn>
      </template>
      <template v-else>
        <div class="buttons">
          <v-btn @click="privacy.publishTerm" type="button" class="bg-warning mr-3">Publish</v-btn>
          <v-btn @click="privacy.saveDraft" type="button" class="bg-success">Draft</v-btn>
        </div>
      </template>
    </v-form>
  </template>
</template>

<style lang="scss" scoped>
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
