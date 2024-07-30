<script setup lang="ts">
import type { Author } from '@/interfaces/Author';
import { format } from "date-fns";

const props = defineProps<{
    author: Author
}>();

// Determine which date to show
const displayDate = props.author.updated_at >= props.author.created_at
    ? props.author.updated_at
    : props.author.created_at;


</script>

<template>
    <div class="card" style="margin-top: 10px; margin-bottom: 10px">
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-4">{{ props.author.name }} {{ props.author.surname }}</p>
                </div>
            </div>
            <div class="content">
                <time>{{ format(displayDate, 'yyyy-MM-dd h:mm a') }}</time>
            </div>
        </div>
    </div>
</template>