<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import WelcomeHeader from './components/WelcomeHeader.vue';
import NavigationBar from './components/NavigationBar.vue';
</script>

<template>
  <header>
    <WelcomeHeader/>
    <NavigationBar/>
  </header>
  <RouterView />


</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}


</style>
