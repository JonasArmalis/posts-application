<script setup lang="ts">
</script>

<template>
    <div>
        <nav>
            <RouterLink to="/">Posts</RouterLink>
            <RouterLink to="/authors">Authors</RouterLink>
            <RouterLink to="/login">Login</RouterLink>
        </nav>
    </div>
</template>

<style scoped>
nav {
    width: 100%;
    font-size: 12px;
    text-align: left;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}
</style>