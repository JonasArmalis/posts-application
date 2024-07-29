<script setup lang="ts">
import type { Post } from '@/interfaces/Post';
import { getPost } from '@/services/PostService';
import { useNotifyStore } from '@/stores/notification.store';
import { computed, ref, watch } from 'vue';
import { format } from "date-fns";
import { useRoute } from 'vue-router';

const route = useRoute();
const notifyStore = useNotifyStore();


const post = ref<Post | undefined>(undefined);

const fetchPost = async (id: Number) => {
    try {
        post.value = await getPost(id);
    } catch (error) {
        notifyStore.notifyError("Failed to load the post");
    }
};

watch(() => route.params.id, (id) => {
    if (id) {
        fetchPost(Number(id));
    }
}, { immediate: true });

const displayDate = computed(() => {
    if (!post.value) {
        return '';
    }
    const { updated_at, created_at } = post.value;
    return updated_at >= created_at ? updated_at : created_at;
});

</script>

<template>
    <div class="box">
        <div v-if="post">
            <p class="title is-3">{{ post.title }} </p>
            <p class="subtitle is-6">Posted by: {{ post.author.name }} {{ post.author.surname }}</p>
            <p class="content">{{ post.body }}</p>
            <time v-if="displayDate">{{ format(displayDate, 'yyyy-MM-dd h:mm a') }}</time>
        </div>
    </div>
</template>
