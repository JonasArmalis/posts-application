<script setup lang="ts">
import type { Author } from '@/interfaces/Author';
import { editAuthor } from '@/services/AuthorService';
import { useModalStore } from '@/stores/modalStore';
import { useNotifyStore } from '@/stores/notification.store';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

const props = defineProps<{
    author: Author  
}>();

// Ensure props.author is not undefined
if (!props.author) {
    throw new Error('Author prop is not provided');
}


const schema = yup.object({
    name: yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .test('not-only-spaces', 'Name must consist of at least 2 non-space characters', value => value !== undefined && value.trim().length >= 2)
        .matches(/^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ\s]*$/, 'Name cannot contain numbers or special symbols')
        .max(50, 'Name cannot be more than 50 characters'),
    surname: yup.string()
        .required('Surname is required')
        .min(2, 'Surname must be at least 2 characters')
        .test('not-only-spaces', 'Surname must consist of at least 2 non-space characters', value => value !== undefined && value.trim().length >= 2)
        .matches(/^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ\s]*$/, 'Name cannot contain numbers or special symbols')
        .max(50, 'Surname cannot be more than 50 characters')
});

const { handleSubmit, resetForm } = useForm({
    validationSchema: schema,
    initialValues: {
        name: props.author.name,
        surname: props.author.surname
    }   
});

const { value: name, errorMessage: nameError, handleBlur: nameBlur } = useField('name');
const { value: surname, errorMessage: surnameError, handleBlur: surnameBlur } = useField('surname');

const modalStore = useModalStore();
const notifyStore = useNotifyStore();

const onSubmit = handleSubmit(async (values) => {

    console.log(props);
    try {
        await editAuthor(values.name, values.surname, props.author.id);
        notifyStore.notifySuccess("Success! Author has been modified");
        modalStore.closeModal();
        resetForm();
    } catch (error) {
        notifyStore.notifyError("Failed to modify the author");
    }
});

const onCancel = () => {
    modalStore.closeModal();
};

</script>

<template>
    <div>
        <form @submit="onSubmit" no-validate>
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input v-model="name" @blur="nameBlur" class="input" type="text" placeholder="e.g. John">
                </div>
                <p v-if="nameError" class="help is-danger">{{ nameError }}</p>
            </div>

            <div class="field">
                <label class="label">Surname</label>
                <div class="control">
                    <input v-model="surname" @blur="surnameBlur" class="input" type="text" placeholder="e.g. Smith">
                </div>
                <p v-if="surnameError" class="help is-danger">{{ surnameError }}</p>
            </div>

            <div class="buttons">
                <button type="submit" class="button is-success">Save</button>
                <button type="button" @click="onCancel" class="button is-danger">Cancel</button>
            </div>
        </form>
    </div>
</template>