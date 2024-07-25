<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavigationBar from './components/NavigationBar.vue';

import NotificationWrapper from './components/NotificationWrapper.vue';

</script>

<template>
  <header>
    <NavigationBar />
  </header>
  <RouterView />
  <NotificationWrapper/>


</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
