<script setup>
import CustomDataTable from '@/components/Admin/CustomDataTable.vue'
import { onMounted} from 'vue'
import { useMessageAdminStore } from '../../../../../store/admin/message';

const message=useMessageAdminStore()

onMounted(() => {
  message.getmessageData()
})

</script>
<template>
  <template v-if="message.loading">
    <v-container fluid fill-height class="d-flex justify-center align-center">
      <v-progress-circular indeterminate color="primary" size="64" width="6"></v-progress-circular>
    </v-container>
  </template>
  <template v-else-if="message.messageData.length === 0">
    <v-title class="text-h1 text-center">There are no Messages</v-title>
  </template>
  <template v-else>
    <v-row>
      <v-col col="12" class="text-center">
        <h2 class="text-h4">Messages List</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <custom-data-table
            :items="message.messageData"
            :headers="message.headers"
            :pagination="message.pagination"
            @delete-item="message.handleDeleteMessageClick"
          ></custom-data-table>
        </v-card>
      </v-col>
    </v-row>
  </template>
</template>

<style lang="scss" scoped></style>
