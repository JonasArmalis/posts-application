<script setup lang="ts">
</script>

<template>
    <nav class="navbar is-link" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" class="navbar-menu">
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
