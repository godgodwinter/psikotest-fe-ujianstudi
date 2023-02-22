<script setup>
import { RouterLink, RouterView } from "vue-router";
import DefaultNavbar from "./layouts-components/DefaultNavbar.vue";
</script>

<template>
    <div data-theme="winter" class="min-h-screen">
        <DefaultNavbar />
        <RouterView />
    </div>
</template>
