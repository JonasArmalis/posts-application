<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNotifyStore } from '@/stores/notification.store';
import type { Post } from '@/interfaces/Post';
import { getAllPosts } from '@/services/PostService';
import PostCard from './PostCard.vue';
import PaginationMenu from './PaginationMenu.vue';
import SearchBar from './SearchBar.vue';

const limit = 5;
const searchValue = ref<String>("");
const currentPage = ref<number>(1);
const notifyStore = useNotifyStore();
const posts = ref<Post[]>([]);
const postAmount = ref<number>();
const infoMessage = ref<string>();

const fetchPosts = async () => {
    try {
        const { data, totalAmount } = await getAllPosts(currentPage.value, limit, searchValue.value);
        posts.value = data;
        postAmount.value = totalAmount;
        if (posts.value.length == 0) {
            infoMessage.value = "No Posts have been found with this search criteria";
            notifyStore.notifyInfo(infoMessage.value);
        }
    } catch (error) {
        postAmount.value = undefined;
        posts.value = [];
        infoMessage.value = "Failed to load the posts, please try again later";
        notifyStore.notifyError(infoMessage.value);
    }
};

onMounted(fetchPosts);

const handlePageChange = (page: number) => {
    currentPage.value = page;
    fetchPosts();
};

const handleSearch = (input: String) => {
    currentPage.value = 1;
    searchValue.value = input;
    infoMessage.value = undefined; 
    fetchPosts();
}


</script>

<template>
    <div style="padding: 20px;">
        <SearchBar @search="handleSearch" />
        <div v-if="infoMessage">
            <h1> <strong> {{ infoMessage }} </strong></h1>
        </div>

        <div v-for="post in posts" :key="post.id">
            <PostCard :post="post" />
        </div>
        <PaginationMenu v-if="postAmount && postAmount > 0" :totalPages="Math.ceil(postAmount / limit)" :perPage="limit"
            :currentPage="currentPage" @pagechanged="handlePageChange" />
    </div>
</template>