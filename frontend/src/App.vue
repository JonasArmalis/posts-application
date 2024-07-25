<script setup lang="ts">
import { RouterView } from 'vue-router';
import WelcomeHeader from './components/WelcomeHeader.vue';
import NavigationBar from './components/NavigationBar.vue';
import { storeToRefs } from 'pinia';
import { useNotifyStore } from './stores/notification.store';
import NotificationPopup from './components/NotificationPopup.vue';

const notifyStore = useNotifyStore();
const { state } = storeToRefs(notifyStore);
</script>

<template>
  <header>
    <WelcomeHeader />
    <NavigationBar />
  </header>
  <RouterView />

  <div>
    <div v-for="notification in state.notifications" :key="notification.notifyTime">
      <NotificationPopup :notification="notification" />
    </div>
  </div>


</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
