<script setup>
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router'
import { useTheme } from 'vuetify/lib/framework.mjs';

const theme=useTheme()

const isDarkMode=ref(false);

onMounted(() => {
  const localValue = JSON.parse(localStorage.getItem("dark_mode"))
  if(localValue){
    theme.global.name.value = "dark"
    isDarkMode.value = true
  }
  else {
    localStorage.setItem("dark_mode",isDarkMode.value)
  }
});

</script>

<template>
  <v-app>
    <RouterView />
  </v-app>
</template>

<style method="scss" scoped></style>
