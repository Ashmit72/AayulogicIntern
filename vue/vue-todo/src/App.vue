<script>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';


export default {
  components: {
    Navbar
  }
}


</script>


<template>
  <div class="container">
    <Navbar />
    <RouterView />
  </div>
</template>
watch



<style lang="scss" scoped>
.container {
  max-width: 90%;
  width: 100%;
  margin: 0 auto;
}
</style>