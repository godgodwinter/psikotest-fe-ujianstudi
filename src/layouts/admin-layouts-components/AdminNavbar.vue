<script setup>
import { useRouter } from 'vue-router';
import { useAdminPagesStore } from '@/stores/admin/adminPagesStore'
const adminPagesStore = useAdminPagesStore();
const router = useRouter();
const doLogout = async () => {
    if (confirm("Apakah anda yakin untuk Logout ?")) {
        // const res = await API.doLogout();
        // if (res === true) {
        router.push({ name: "Login" });
        // }
    }
};

const goTo = async (name) => {
    router.push({ name });
};

const toggleSideBar = () => {
    adminPagesStore.toggleSideBar();
}
</script>
<template>
    <div class="navbar bg-gradient-to-b from-[#d1f6e1] to-white border-b-2 border-gray-50 fixed z-30 w-full top-0">
        <div class="navbar-start">
            <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar"
                class="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:border focus:border focus:ring-2 rounded"
                @click="toggleSideBar()">
                <svg id="toggleSidebarMobileHamburger" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd" />
                </svg>
                <svg id="toggleSidebarMobileClose" class="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </button>
            <span class="btn btn-ghost normal-case text-xl"> YPMT ADMINISTRATOR </span>
        </div>
        <div class="navbar-center hidden lg:flex">
        </div>
        <div class="navbar-end space-x-2">
        </div>
</div>
</template>