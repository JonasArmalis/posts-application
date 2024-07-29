<script setup lang="ts">
import { ref } from 'vue';

const searchValue = ref<string>('');

const emit = defineEmits(['search']);

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