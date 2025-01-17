<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useNotifyStore } from '@/stores/notification.store';
import type { Post } from '@/interfaces/Post';
import { getAllPosts } from '@/services/PostService';
import PostCard from '@/components/PostCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import PaginationMenu from '@/components/PaginationMenu.vue';
import { useModalStore } from '@/stores/modalStore';
import { useAuthStore } from '@/stores/authStore';
import CreatePostForm from '@/components/forms/CreatePostForm.vue';
import { ActionType } from '@/types/ActionType';

const limit = 5;
const searchValue = ref<String>("");
const currentPage = ref<number>(1);
const notifyStore = useNotifyStore();
const posts = ref<Post[]>([]);
const postAmount = ref<number>();
const infoMessage = ref<string>();

const modalStore = useModalStore();
const authStore = useAuthStore();

const fetchPosts = async () => {
  try {
    const { data, totalAmount } = await getAllPosts(currentPage.value, limit, searchValue.value);
    posts.value = data;
    postAmount.value = totalAmount;
    if (posts.value.length == 0) {
      infoMessage.value = "No Posts have been found.";
      notifyStore.notifyInfo(infoMessage.value);
    } else {
      infoMessage.value = undefined;
    }
  } catch (error) {
    postAmount.value = undefined;
    posts.value = [];
    infoMessage.value = "Failed to load the posts, please try again later";
    notifyStore.notifyError(infoMessage.value);
  }
};

onMounted(fetchPosts);

const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchPosts();
};

const handleSearch = (input: String) => {
  currentPage.value = 1;
  searchValue.value = input;
  infoMessage.value = undefined;
  fetchPosts();
}

watch(() => modalStore.state.requestSent, (requestSent) => {
  if (requestSent !== undefined) {
    if (requestSent === ActionType.DELETE) {
      currentPage.value = 1;
    }
    fetchPosts();
  }
});

</script>

<template>
  <div style="padding: 20px;">
    <SearchBar @search="handleSearch" />
    <button v-if="authStore.isUserLoggedIn" @click="modalStore.openModal(CreatePostForm, 'Create a new post')"
            class="button is-link">Create Post</button>
    <div v-if="infoMessage">
      <h1> <strong> {{ infoMessage }} </strong></h1>
    </div>

    <div v-for="post in posts" :key="post.id">
      <PostCard :post="post" />
    </div>
    <PaginationMenu v-if="postAmount && postAmount > 0" :totalPages="Math.ceil(postAmount / limit)" :perPage="limit"
      :currentPage="currentPage" @pagechanged="handlePageChange" />
  </div>
</template>