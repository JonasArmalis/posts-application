<script setup lang="ts">
import { defineProps } from 'vue';
import type { Notification } from '../interfaces/Notification';
import { useNotifyStore } from '../stores/notification.store';

defineProps<{ notification: Notification }>();

const notifyStore = useNotifyStore();
</script>

<template>
    <div :class="notification.type">
        <button @click.prevent="notifyStore.removeNotification(notification)" type="button" aria-label="Close">
            <span>Close</span>
        </button>
        <span>&nbsp;{{notification.message }}</span>
    </div>
</template>