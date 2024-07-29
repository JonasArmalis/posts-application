<script setup lang="ts">
import { ref } from 'vue';

// Define the ref for the search input
const searchValue = ref<string>('');

// Define the emit function to communicate with the parent component
const emit = defineEmits(['search']);

// Function to handle button click
const onButtonClick = () => {
    emit('search', searchValue.value);
};
</script>

<template>
    <div class="field has-addons has-addons-centered" style="margin-left: 10px; margin-right: 10px;">
        <div class="control is-expanded">
            <input v-model="searchValue" class="input" type="text" placeholder="Find something specific"
                @keyup.enter="onButtonClick">
        </div>
        <div class="control">
            <button class="button is-success" @click="onButtonClick">
                Search
            </button>
        </div>
    </div>
</template>