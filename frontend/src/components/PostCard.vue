<script setup lang="ts">
import type { Post } from "@/interfaces/Post";
import router from "@/router";
import { format } from "date-fns";

const props = defineProps<{
    post: Post
}>();

const displayDate = props.post.updated_at >= props.post.created_at
    ? props.post.updated_at
    : props.post.created_at;

const redirectToPost = () => {
    router.push({ path: `/posts/${props.post.id}` });
};

</script>

<template>
    <div class="card" @click="redirectToPost" style="margin: 10px;">
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-4">{{ props.post.title }}</p>
                    <p class="subtitle is-6"> Posted by: {{ props.post.author.name }} {{ props.post.author.surname
                        }}</p>
                </div>
            </div>
            <div class="content">
                <time>{{ format(displayDate, 'yyyy-MM-dd h:mm a') }}</time>
            </div>
        </div>
    </div>
</template>