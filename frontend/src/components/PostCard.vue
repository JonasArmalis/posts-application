<script setup lang="ts">
import type { Post } from "@/interfaces/Post";
import { format } from "date-fns";

const props = defineProps<{
    post: Post
}>();

// Determine which date to show
const displayDate = props.post.updated_at >= props.post.created_at
    ? props.post.updated_at
    : props.post.created_at;


</script>

<template>
    <div class="box">
        <div class="card">
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4">{{ props.post.title }}</p>
                        <p class="subtitle is-6"> Posted by: {{ props.post.author.name }} {{ props.post.author.surname }}</p>
                    </div>
                </div>

                <div class="content">
                    <time>{{ format(displayDate, 'yyyy-MM-dd h:mm a') }}</time>
                </div>
            </div>
        </div>
    </div>
</template>