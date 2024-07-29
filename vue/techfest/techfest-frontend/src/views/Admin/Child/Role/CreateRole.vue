<script setup>
import {onMounted } from 'vue';
import { useAdminRole } from '../../../../../store/admin/role';

const role=useAdminRole()

onMounted(() => {
  if (role.id) {
    role.getRoleDataById();
  }
});
</script>

<template>
  <v-form @submit.prevent="role.handleSubmit">
    <v-text-field v-model="role.roleData.title" label="Enter the Title" variant="solo"></v-text-field>

    <v-text-field
      v-model="role.roleData.level"
      type="number"
      label="Enter the Level"
      variant="solo"
    ></v-text-field>

    <div class="buttons">
      <v-btn
        @click="role.roleData.status = 'Draft'"
        type="submit"
        class="bg-success"
        style="margin-right: 1rem"
      >Draft</v-btn>
      <v-btn
        @click="role.roleData.status = 'Published'"
        type="submit"
        class="bg-warning"
      >Publish</v-btn>
    </div>
  </v-form>
</template>

<style>
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style
