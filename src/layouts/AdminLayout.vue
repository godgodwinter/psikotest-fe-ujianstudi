<script setup>
import { RouterLink, RouterView } from "vue-router";
import AdminNavbar from "./admin-layouts-components/AdminNavbar.vue";
import AdminSidebar from "./admin-layouts-components/AdminSidebar.vue";
</script>

<template>
    <div data-theme="winter" class="min-h-screen">
        <AdminNavbar />
        <AdminSidebar />

        <div class="flex overflow-hidden pt-24 px-2 bg-base-100">
            <div class="opacity-50 hidden fixed inset-0 z-10" />
            <div class="w-full relative lg:ml-72">
                <main class="pb-4 min-h-screen">
                    <RouterView />
                </main>
            </div>
        </div>
</div>
</template>
