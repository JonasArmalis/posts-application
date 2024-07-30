<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Author } from '@/interfaces/Author';
import { getAllAuthors } from '../services/AuthorService';
import AuthorCard from './AuthorCard.vue';
import { useNotifyStore } from '@/stores/notification.store';
import PaginationMenu from './PaginationMenu.vue';
import SearchBar from './SearchBar.vue';

const notifyStore = useNotifyStore();
const limit = 5;
const searchValue = ref<String>("");
const currentPage = ref<number>(1);
const authors = ref<Author[]>([]);
const authorAmount = ref<number>();
const infoMessage = ref<string>();

const fetchAuthors = async () => {
    try {
        const { data, totalAmount } = await getAllAuthors(currentPage.value, limit, searchValue.value);
        authors.value = data;
        authorAmount.value = totalAmount;
        if (authors.value.length == 0) {
            infoMessage.value = "No Authors have been found with this search criteria";
            notifyStore.notifyInfo(infoMessage.value);
        }
    } catch (error) {
        authorAmount.value = undefined;
        authors.value = [];
        infoMessage.value = "Failed to load the authors, please try again later";
        notifyStore.notifyError(infoMessage.value);
    }
};

const handlePageChange = (page: number) => {
    currentPage.value = page;
    fetchAuthors();
};
const handleSearch = (input: String) => {
    currentPage.value = 1;
    searchValue.value = input;
    infoMessage.value = undefined;
    fetchAuthors();
}

onMounted(fetchAuthors);

</script>

<template>
    <div style="padding: 20px;">
        <SearchBar @search="handleSearch" />
        <div v-if="infoMessage">
            <h1> <strong> {{ infoMessage }} </strong></h1>
        </div>
        <div v-for="author in authors" :key="author.id">
            <AuthorCard :author="author" />
        </div>
        <PaginationMenu v-if="authorAmount && authorAmount > 0" :totalPages="Math.ceil(authorAmount / limit)" :perPage="limit"
            :currentPage="currentPage" @pagechanged="handlePageChange" />
    </div>
</template>