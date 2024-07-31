<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore';
import { deleteAuthor, getAuthor } from '@/services/AuthorService';
import { useNotifyStore } from '@/stores/notification.store';
import type { Author } from '@/interfaces/Author';

const modalStore = useModalStore();
const notifyStore = useNotifyStore();
const props = defineProps<{
    author: Author
}>();

const onDeleteButtonClick = async () => {
    try {
        await deleteAuthor(props.author.id);
        notifyStore.notifySuccess("Success! Author has been deleted");
        modalStore.setRequestSentStatus(true);
    } catch (error) {
        notifyStore.notifyError("Failed to delete author, please try again later");
    }
    modalStore.closeModal();
}

const onCancelButtonClick = async () => {
    modalStore.closeModal();
}


</script>

<template>
    <div >
        <p class="subtitle is-6">Are you sure you want to delete this author?</p>
        <p class="title is-5">{{ props.author.name }} {{ props.author.surname }}</p>
        <div class="buttons is-centered">
            <button @click="onDeleteButtonClick" class="button is-danger">Yes, Delete</button>
            <button @click="onCancelButtonClick" class="button is-info">Cancel</button>
        </div>
    </div>
</template>