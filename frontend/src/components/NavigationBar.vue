<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/authStore';

// Access the auth store
const authStore = useAuthStore();

// Define the logout function
const onLogoutButtonClick = async () => {
    await authStore.logout(); // Log out the user
    router.push('/login'); // Redirect to login page
};
</script>

<template>
    <nav class="navbar is-link" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <RouterLink to="/posts" class="navbar-item">
                <img src="/logo.svg" alt="Logo">
            </RouterLink>
        </div>
        <div class="navbar-menu">
            <div class="navbar-start">
                <RouterLink class="navbar-item" to="/posts">Posts</RouterLink>
                <RouterLink class="navbar-item" to="/authors">Authors</RouterLink>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <!-- Login button is shown when the user is not logged in -->
                        <RouterLink v-if="!authStore.isUserLoggedIn" class="button is-primary" to="/login">
                            <strong>Login</strong>
                        </RouterLink>

                        <!-- Logout button is shown when the user is logged in -->
                        <button v-if="authStore.isUserLoggedIn" @click="onLogoutButtonClick" class="button is-danger">
                            <strong>Logout</strong>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>