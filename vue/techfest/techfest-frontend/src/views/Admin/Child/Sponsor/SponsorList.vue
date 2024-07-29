<script setup>
import { onMounted } from 'vue'
import CustomDataTable from '@/components/Admin/CustomDataTable.vue'
import { useAdminSponsorStore } from '../../../../../store/admin/sponsor';

const sponsor=useAdminSponsorStore()

onMounted(()=>{
 sponsor.getSponsorData()
})


</script>
<template>
  <template v-if="sponsor.loading">
    <v-container fluid fill-height class="d-flex justify-center align-center">
      <v-progress-circular indeterminate color="primary" size="64" width="6"></v-progress-circular>
    </v-container>
  </template>
  <template v-else>
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
        <v-card>
          <custom-data-table
            :items="sponsor.sponsorData"
            :headers="sponsor.headers"
            :pagination="sponsor.pagination"
            @delete-item="sponsor.handleSponsorDeleteClick"
            :imageKey="'sponsorImage'"
          ></custom-data-table>
        </v-card>
      </v-col>
    </v-row>
  </template>
</template>

<style lang="scss" scoped></style>
