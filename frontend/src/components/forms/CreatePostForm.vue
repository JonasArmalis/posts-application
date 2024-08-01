<script setup lang="ts">
import type { Author } from '@/interfaces/Author';
import { createAuthor, getAllAuthors } from '@/services/AuthorService';
import { useModalStore } from '@/stores/modalStore';
import { useNotifyStore } from '@/stores/notification.store';
import { useForm, useField } from 'vee-validate';
import { onMounted, ref } from 'vue';
import * as yup from 'yup';

const createPostValidationSchema = yup.object({
    title: yup.string()
        .required('Title is required')
        .min(2, 'Title must be at least 2 characters')
        .test('not-only-spaces', 'Title must consist of at least 2 non-space characters', value => value !== undefined && value.trim().length >= 2)
        .matches(/^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ\s]*$/, 'Title cannot contain numbers or special symbols')
        .max(50, 'Title cannot be more than 50 characters'),
    content: yup.string()
        .required('Content is required')
        .min(2, 'Content must be at least 2 characters')
        .test('not-only-spaces', 'Content must consist of at least 2 non-space characters', value => value !== undefined && value.trim().length >= 2)
        .matches(/^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ\s]*$/, 'Content cannot contain numbers or special symbols')
        .max(50, 'Content cannot be more than 50 characters')
});

const modalStore = useModalStore();
const notifyStore = useNotifyStore();
const authors = ref<Author[]>([]);
const isDropdownOpen = ref(false);
const selectedAuthor = ref<Author | null>(null);

const { handleSubmit, resetForm } = useForm({
    validationSchema: createPostValidationSchema,
});

const { value: title, errorMessage: titleError, handleBlur: titleBlur } = useField<string>('title');
const { value: content, errorMessage: contentError, handleBlur: contentBlur } = useField<string>('content');

const onSubmit = handleSubmit(async (values) => {
    try {
        await createAuthor(values.name, values.surname);
        notifyStore.notifySuccess("Success! Post has been created");
        modalStore.setRequestSentStatus(true);
    } catch (error) {
        notifyStore.notifyError("Failed to create a post");
    }
    modalStore.closeModal();
    resetForm();
});

const fetchAuthors = async () => {
    try {
        const { data } = await getAllAuthors(0, -1, "");
        authors.value = data;
        console.log(authors.value.length);
        console.dir(authors.value)

    } catch (error) {
        notifyStore.notifyError("Failed to fetch authors for post creation");
    }
};

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const selectAuthor = (author: Author) => {
    selectedAuthor.value = author;
    isDropdownOpen.value = false; // Close dropdown after selection
};

onMounted(fetchAuthors);
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
                <label class="label">Author</label>
                <div class="control">
                    <div :class="['dropdown', { 'is-active': isDropdownOpen }]">
                        <div class="dropdown-trigger">
                            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu"
                                @click="toggleDropdown">
                                <span>{{ selectedAuthor ? selectedAuthor.name + selectedAuthor.surname : 'Select Author'
                                    }}</span>
                                <span class="icon is-small">
                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div>
                        <div class="dropdown-menu" id="dropdown-menu" role="menu">
                            <div class="dropdown-content" style="max-height: 200px; overflow-y: auto;">
                                <a v-for="author in authors" :key="author.id" class="dropdown-item"
                                    @click="selectAuthor(author)">
                                    {{ author.name }} {{ author.surname }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field">
                <label class="label">Content</label>
                <div class="control">
                    <textarea v-model="content" @blur="contentBlur" class="textarea"
                        placeholder="e.g. This is the body of a new post"></textarea>
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