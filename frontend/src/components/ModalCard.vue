<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore';

import { storeToRefs } from 'pinia';

const modalStore = useModalStore();
const { state } = storeToRefs(modalStore);

</script>

<template>
    <div v-if="state.isOpen" class="modal is-active">
        <div class="modal-background" @click="modalStore.closeModal"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title"> {{ state.header}}</p>
                <button class="delete" aria-label="close" @click="modalStore.closeModal"></button>
            </header>
            <section class="modal-card-body">
                <component :is="state.component"> </component>
            </section>
            <footer class="modal-card-foot">
               
            </footer>
        </div>
    </div>
</template>