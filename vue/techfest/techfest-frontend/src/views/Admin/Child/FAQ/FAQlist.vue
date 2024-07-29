<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import CustomDataTable from '@/components/Admin/CustomDataTable.vue'
import { useAdminFAQstore } from '../../../../../store/admin/faq';


const store=useAdminFAQstore()

onMounted(() => {
  store.getFAQData()
})
</script>
<template>
  <v-row>
    <v-col col="12" class="text-center">
      <RouterLink :to="$route.fullPath + '/create'">
        <v-icon
          style="transform: scale(1.4); cursor: pointer"
          color="green"
          icon="mdi-pencil-plus"
        ></v-icon>
      </RouterLink>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-card class="card-container">
        <custom-data-table
          :items="store.faqData"
          :headers="store.headers"
          :pagination="store.pagination"
          @delete-item="store.faqDeleteData"
        ></custom-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss">
.card-container {
  padding: 1rem;
}
</style>
