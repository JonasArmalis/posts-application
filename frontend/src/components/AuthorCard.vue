<script setup lang="ts">
import type { Author } from '@/interfaces/Author';
import { useModalStore } from '@/stores/modalStore';
import { format } from "date-fns";
import EditAuthorForm from './forms/EditAuthorForm.vue';


const modalStore = useModalStore();
const props = defineProps<{
    author: Author
}>();



const openAuthorFormModal = () => {
    modalStore.openModal(EditAuthorForm, 'Edit author details', props.author)
}

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
        <footer class="card-footer">
            <a @click="openAuthorFormModal" class="card-footer-item">Edit</a>
            <a class="card-footer-item">Delete</a>
        </footer>
    </div>
</template>