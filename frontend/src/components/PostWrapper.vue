<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNotifyStore } from '@/stores/notification.store';
import type { Post } from '@/interfaces/Post';
import { getAllPosts } from '@/services/PostService';
import PostCard from './PostCard.vue';
import PaginationMenu from './PaginationMenu.vue';

const limit = 5;
const currentPage = ref<number>(1);
const notifyStore = useNotifyStore();
const posts = ref<Post[]>([]);
const postAmount = ref<number>();

const fetchPosts = async (page: number) => {
    try {
        const { data, totalAmount } = await getAllPosts(page, limit);
        posts.value = data;
        postAmount.value = totalAmount;
    } catch (error) {
        notifyStore.notifyError("Failed to load the posts");
    }
};

onMounted(() => fetchPosts(currentPage.value));

const handlePageChange = (page: number) => {
    currentPage.value = page;
    fetchPosts(page);
};


</script>

<template>
    <div>
        <div v-if="posts.length == 0">
            <h1> <strong>Failed to load posts, please try again later </strong></h1>
        </div>
        <div v-for="post in posts" :key="post.id">
            <PostCard :post="post" />
        </div>
        <PaginationMenu v-if="postAmount" :totalPages="Math.ceil(postAmount / limit)" :perPage="limit"
            :currentPage="currentPage" @pagechanged="handlePageChange" />
    </div>
</template>