<script setup>
import { onMounted} from 'vue'
import { useAdminTermStore } from '../../../../../store/admin/term';


const term=useAdminTermStore()
onMounted(()=>{
  term.getTermData()
})


</script>
<template>
  <template v-if="term.loading">
    <v-container fluid fill-height class="d-flex justify-center align-center">
      <v-progress-circular indeterminate color="primary" size="64" width="6"></v-progress-circular>
    </v-container>
  </template>
  <template v-else>
    <v-form @submit.prevent="term.termData.id ? term.patchTermData : term.postTermData">
      <template v-if="term.termData.id">
        <p style="margin-bottom: 1rem; text-align: center; font-size: larger; color: red">
          Status :{{ term.termData.status }}
        </p>
      </template>
      <v-textarea
        v-model="term.termData.content"
        rows="20"
        label="Terms and Conditions"
        variant="solo"
      ></v-textarea>
      <template v-if="!term.termData.id">
        <v-btn @click="createTerm" type="submit" class="bg-warning">Create</v-btn>
      </template>
      <template v-else>
        <div class="buttons">
          <v-btn @click="term.publishTerm" type="button" class="bg-warning mr-3">Publish</v-btn>
          <v-btn @click="term.saveDraft" type="button" class="bg-success">Draft</v-btn>
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
