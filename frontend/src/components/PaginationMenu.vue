<script setup lang="ts">
import { computed, onMounted } from 'vue';


const props = defineProps<{
    totalPages: number,
    perPage: number,
    currentPage: number
}>();

const emit = defineEmits<{
    (e: 'pagechanged', page: number): void;
}>();

onMounted(() => {
    console.log(props.totalPages);
})


const isInFirstPage = computed(() => props.currentPage === 1);
const isInLastPage = computed(() => props.currentPage === props.totalPages);

const onClickFirstPage = () => { emit('pagechanged', 1); };
const onClickPreviousPage = () => { emit('pagechanged', props.currentPage - 1); };
const onClickPage = (page: number) => { emit('pagechanged', page); };
const onClickNextPage = () => { emit('pagechanged', props.currentPage + 1); };
const onClickLastPage = () => { emit('pagechanged', props.totalPages); };

</script>

<template>
    <div class="box">
        <nav class="pagination is-centered" role="navigation" aria-label="pagination">
            <a @click="onClickPreviousPage" :disabled="isInFirstPage" href="#" class="pagination-previous">Previous</a>
            <a @click="onClickNextPage" :disabled="isInLastPage" href="#" class="pagination-next">Next page</a>
            <ul class="pagination-list">
                <li v-if="currentPage > 2"><a @click="onClickFirstPage" :disabled="isInFirstPage" href="#"
                        class="pagination-link">1</a></li>
                <li v-if="currentPage > 2"><span class="pagination-ellipsis">&hellip;</span></li>
                <li><a href="#" class="pagination-link">{{ currentPage - 1 }}</a></li>
                <li>
                    <a class="pagination-link is-current" aria-current="page">{{ currentPage }}</a>
                </li>
                <li v-if="currentPage < totalPages"><a href="#" class="pagination-link">{{ currentPage + 1 }}</a></li>
                <li v-if="currentPage < totalPages - 1"><span class="pagination-ellipsis">&hellip;</span></li>
                <li v-if="currentPage < totalPages"><a @click="onClickLastPage" :disabled="isInLastPage" href="#"
                        class="pagination-link">{{ totalPages }}</a></li>
            </ul>
        </nav>
    </div>
</template>