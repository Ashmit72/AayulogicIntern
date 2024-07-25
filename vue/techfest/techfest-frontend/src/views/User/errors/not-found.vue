
<script setup >
import { useRouter } from 'vue-router';

const router=useRouter()
const goPrevpage=()=> {
      router.go(-1)
    }
</script>

<template>
  <v-content>
    <div class="block notfound text-center">
      <h2 class="mb-4 text-h2">Page Not Found</h2>
      <v-icon color="warning" icon="mdi-alert icon mt-4 mb-4"></v-icon>
      <p class="text-subtitle-1 mt-4 mb-4">
        We're sorry, the page you requested could not be found.
      </p>
      <v-btn @click="goPrevpage" variant="tonal"> Go Back </v-btn>
    </div>
  </v-content>
</template>

<style lang="scss" scoped>
.notfound {
  transform: translateY(300px);

  .icon {
    transform: scale(1.9);
  }
}
</style>
