<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import router from '@/router';

const authStore = useAuthStore();

const passwordInput = ref<HTMLInputElement | null>(null);

const email = ref<string>("");
const password = ref<string>("");

const onLoginButtonClick = async () => {
    const success = await authStore.login(email.value, password.value);
    if (success) {
        router.push('/');
    }
}

</script>

<template>
    <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 100vh;">
        <div class="box">
            <h1 class="title is-4 has-text-centered">Enter Your Login Details</h1>
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input v-model="email" class="input" type="email" placeholder="Email"
                        @keydown.enter="$nextTick(() => { if (passwordInput) passwordInput.focus(); })">
                        <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input v-model="password" class="input" type="password" placeholder="Password"
                        @keydown.enter="onLoginButtonClick()" ref="passwordInput">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field has-text-centered">
                <p class="control">
                    <button @click="onLoginButtonClick" class="button is-success">
                        Login
                    </button>
                </p>
            </div>
        </div>
    </div>
</template>