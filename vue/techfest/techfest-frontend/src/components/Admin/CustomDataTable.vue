<script setup>
import { ref,defineEmits,defineProps } from 'vue'

const showDialog = ref(false)
const messageName = ref('')
const messageContent = ref('')
const messageSubject = ref('')



const emit=defineEmits(
  ['delete-item']
)


const props = defineProps({
  items:{
    type: Array,
    required: true
  },
  headers:{
    type: Array,
    required: true
  },
  imageKey:{
    type: String,
    required: false
  },
  pagination:{
    type: Object,
    required: true,
    default: () => ({
      totalPage: 1,
      totalItems: 0,
      itemsPerPage: 10,
      currentPage: 1
    })
  }
}
)
const showMessage = (item) => {
  messageName.value = item.name
  messageContent.value = item.message
  messageSubject.value = item.subject
  showDialog.value = true
}

const emitDelete = (id) => {
  emit('delete-item', id)
}
</script>

<template>
  <v-dialog v-model="showDialog" max-width="500">
    <template v-slot:default="{ isActive }">
      <v-card :subtitle="messageSubject" :title="messageName">
        <v-card-text>
          {{ messageContent }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>

  <v-data-table-server
    :items="items"
    :headers="headers"
    v-model:items-per-page="pagination.itemsPerPage"
    :items-length="pagination.totalItems"
  >
    <template v-slot:item.image="{ item }">
      <template v-if="imageKey">
        <v-img cover :src="item[imageKey].url"></v-img>
      </template>
      <slot name="icon"></slot>
    </template>
    <template v-slot:item.edit="{ item }">
      <RouterLink :to="$route.fullPath + '/edit/' + item.id">
        <v-icon style="cursor: pointer" color="green" icon="mdi-tag-edit"></v-icon>
      </RouterLink>
    </template>
    <template v-slot:item.delete="{ item }">
      <v-icon
        @click="emitDelete(item.id)"
        style="cursor: pointer"
        color="red"
        icon="mdi-delete"
      ></v-icon>
    </template>
    <template v-slot:item.view="{ item }">
      <v-icon
        @click="showMessage(item)"
        style="cursor: pointer"
        color="red"
        icon="mdi-eye-outline"
      ></v-icon>
    </template>
  </v-data-table-server>
</template>

<style lang="scss"></style>
