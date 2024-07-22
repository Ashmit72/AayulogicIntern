<script setup> 
import { RouterView } from 'vue-router';
import Navbar from "@/components/Navbar.vue"
</script>
<template>
  <div class="container" >
    <Navbar/>
    <RouterView />
  </div>
</template>


<style lang="scss" scoped>
.container{
  max-width: 90%;
  width: 100%;
  margin: 0 auto;
}
</style>