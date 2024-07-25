<script setup lang="ts">
</script>

<template>
    <nav class="navbar is-link" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item">
                <img src="/logo.svg" alt="Logo">
            </a>
        </div>
        <div class="navbar-menu">
            <div class="navbar-start">
                <RouterLink class="navbar-item" to="/">Posts</RouterLink>
                <RouterLink class="navbar-item" to="/authors">Authors</RouterLink>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <RouterLink class="button is-primary" to="/login">
                            <strong>
                                Login
                            </strong>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
