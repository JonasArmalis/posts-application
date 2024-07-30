<script setup lang="ts">
import { createAuthor } from '@/services/AuthorService';
import { useModalStore } from '@/stores/modalStore';
import { useNotifyStore } from '@/stores/notification.store';
import { computed, ref } from 'vue';

const name = ref<string>("");
const surname = ref<string>("");

const modalStore = useModalStore();
const notifyStore = useNotifyStore();

const validFields = computed(() => {
    return name.value.length > 0 && surname.value.length > 0;
});

const onSaveButtonClick = async () => {
    if (validFields.value) {
        try {
            await createAuthor(name.value, surname.value);
            modalStore.closeModal();
            notifyStore.notifySuccess("Success! Author has been created");
        } catch (error) {
            notifyStore.notifyError("Failed to create an author");
        }
    } else {
        notifyStore.notifyWarning("Please enter name and surname")
    }
}

</script>

<template>
    <div>
        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input v-model="name" class="input" type="text" placeholder="eg. John">
            </div>
        </div>

        <div class="field">
            <label class="label">Surname</label>
            <div class="control">
                <input v-model="surname" class="input" type="text" placeholder="e.g. Smith">
            </div>
        </div>
        <div class="buttons">
            <button @click="onSaveButtonClick" class="button is-success">Save</button>
            <button @click="modalStore.closeModal" class="button is-danger">Cancel</button>
        </div>
    </div>
</template>