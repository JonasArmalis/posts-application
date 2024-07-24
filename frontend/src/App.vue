<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import WelcomeHeader from './components/WelcomeHeader.vue';
import NavigationBar from './components/NavigationBar.vue';
import { storeToRefs } from 'pinia';
import { useNotifyStore } from './stores/notification.store';
import { NotificationType } from './types/NotificationType';
import NotificationPopup from './components/NotificationPopup.vue';


const notifyStore = useNotifyStore();
const { notifications } = storeToRefs(notifyStore);


function show() {
  notifyStore.notify("it worked!", NotificationType.SUCCESS);
}

</script>

<template>
  <header>
    <WelcomeHeader />
    <NavigationBar />
    <button @click="show"> show a success notification</button>


  </header>
  <RouterView />

  <div>
    <div v-for="notification in notifications" :key="notification.notifyTime">
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
