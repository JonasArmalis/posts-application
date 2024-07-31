<script setup lang="ts">
import { createAuthor } from '@/services/AuthorService';
import { useModalStore } from '@/stores/modalStore';
import { useNotifyStore } from '@/stores/notification.store';
import { authorValidationSchema } from '@/validation/authorValidationScema';
import { useForm, useField } from 'vee-validate';

const modalStore = useModalStore();
const notifyStore = useNotifyStore();

const { handleSubmit, resetForm } = useForm({
    validationSchema: authorValidationSchema,
});

const { value: title, errorMessage: titleError, handleBlur: titleBlur } = useField<string>('title');
const { value: content, errorMessage: contentError, handleBlur: contentBlur } = useField<string>('content');

const onSubmit = handleSubmit(async (values) => {
    try {
        await createAuthor(values.name, values.surname);
        notifyStore.notifySuccess("Success! Author has been created");
        modalStore.setRequestSentStatus(true);
    } catch (error) {
        notifyStore.notifyError("Failed to create an author");
    }
    modalStore.closeModal();
    resetForm();
});

</script>

<template>
    <div>
        <form @submit="onSubmit" no-validate>
            <div class="field">
                <label class="label">Title</label>
                <div class="control">
                    <input v-model="title" @blur="titleBlur" class="input" type="text" placeholder="e.g. New Post">
                </div>
                <p v-if="titleError" class="help is-danger">{{ titleError }}</p>
            </div>

            <div class="field">
                <label class="label">Content</label>
                <div class="control">
                    <textarea v-model="content" @blur="contentBlur" class="textarea" placeholder="e.g. This is the body of a new post"></textarea>
                </div>
                <p v-if="contentError" class="help is-danger">{{ contentError }}</p>
            </div>

            <div class="buttons is-centered">
                <button type="submit" class="button is-success">Save</button>
                <button type="button" @click="modalStore.closeModal()" class="button is-danger">Cancel</button>
            </div>
        </form>
    </div>
</template>