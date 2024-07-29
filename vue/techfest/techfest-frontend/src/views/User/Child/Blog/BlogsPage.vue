<script setup>
import { onMounted } from 'vue';
import { useUserBlogStore } from '../../../../../store/user/blog';

const blogStore = useUserBlogStore();

onMounted(() => {
  blogStore.getBlogsData();
});
</script>

<template>
  <v-row>
    <v-col xl="6" v-for="blog in blogStore.blogs" :key="blog.slug">
      <v-card class="mx-auto" max-width="900">
        <v-img height="200px" :src="blog.featuredImage?.url" cover></v-img>
        <v-card-title>{{ blog.title }}</v-card-title>
        <v-card-subtitle>Created At {{ blog.createdAt }}</v-card-subtitle>
        <v-card-actions>
          <router-link :to="`blog/${blog.slug}`">
            <v-btn variant="tonal" color="green-lighten-2">Explore</v-btn>
          </router-link>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.blog-container {
  height: 400px;
  cursor: pointer;
}
</style>
