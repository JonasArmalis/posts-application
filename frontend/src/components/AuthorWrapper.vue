<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Author } from '@/interfaces/Author';
import { getAllAuthors } from '../services/AuthorService';
import AuthorCard from './AuthorCard.vue';
import { useNotifyStore } from '@/stores/notification.store';

const notifyStore = useNotifyStore();


const authors = ref<Author[]>([]);

const fetchAuthors = async () => {
    try {
        authors.value = await getAllAuthors();
    } catch (error) {
        notifyStore.notifyError("Failed to load the authors");
    }
};

onMounted(fetchAuthors);

</script>

<template>
    <div v-for="author in authors" :key="author.id">
        <AuthorCard :author="author" />
    </div>
</template>