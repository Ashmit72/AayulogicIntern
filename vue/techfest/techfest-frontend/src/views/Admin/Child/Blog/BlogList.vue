<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import CustomDataTable from '@/components/Admin/CustomDataTable.vue'
import { useAdminBlogStore } from '../../../../../store/admin/blog'

const blog = useAdminBlogStore()
onMounted(() => {
  blog.getBlogData()
})
</script>

<template>
  <div>
    <template v-if="blog.loading">
      <v-container fluid fill-height class="d-flex justify-center align-center">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
          width="6"
        ></v-progress-circular>
      </v-container>
    </template>
    <template v-else-if="blog.blogData.length === 0">
      <v-title class="text-h1 text-center">There are no Blogs</v-title>
    </template>
    <template v-else>
      <v-row>
        <v-col cols="12" class="text-center">
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
              :items="blog.blogData"
              :headers="blog.headers"
              :pagination="blog.pagination"
              @delete-item="blog.handleDeleteBlogClick"
              :imageKey="'featuredImage'"
            ></custom-data-table>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
