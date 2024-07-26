<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNotifyStore } from '@/stores/notification.store';
import type { Post } from '@/interfaces/Post';
import { getAllPosts } from '@/services/PostService';
import PostCard from './PostCard.vue';

const notifyStore = useNotifyStore();


const posts = ref<Post[]>([]);

const fetchPosts = async () => {
    try {
        posts.value = await getAllPosts();
    } catch (error) {
        notifyStore.notifyError("Failed to load the posts");
    }
};

onMounted(fetchPosts);

</script>

<template>
    <div>
        <div v-for="post in posts" :key="post.id">
            <PostCard :post="post" />
        </div>
    </div>
</template>