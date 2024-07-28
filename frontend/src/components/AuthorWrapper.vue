<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Author } from '@/interfaces/Author';
import { getAllAuthors } from '../services/AuthorService';
import AuthorCard from './AuthorCard.vue';
import { useNotifyStore } from '@/stores/notification.store';
import PaginationMenu from './PaginationMenu.vue';

const notifyStore = useNotifyStore();
const limit = 5;
const currentPage = ref<number>(1);
const authors = ref<Author[]>([]);
const authorAmount = ref<number>();

const fetchAuthors = async (page: number) => {
    try {
        const { data, totalAmount } = await getAllAuthors(page, limit);
        authors.value = data;
        authorAmount.value = totalAmount;
    } catch (error) {
        notifyStore.notifyError("Failed to load the authors");
    }
};

const handlePageChange = (page: number) => {
    currentPage.value = page;
    fetchAuthors(page);
};

onMounted(() => fetchAuthors(currentPage.value));

</script>

<template>
    <div>
        <div v-for="author in authors" :key="author.id">
            <AuthorCard :author="author" />
        </div>
        <PaginationMenu v-if="authorAmount" :totalPages="Math.ceil(authorAmount / limit)" :perPage="limit"
        :currentPage="currentPage" @pagechanged="handlePageChange" />
    </div>
</template>