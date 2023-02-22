<script setup>
import { useRouter } from 'vue-router';
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
</script>
<template>
    <div class="navbar bg-gradient-to-b from-[#d1f6e1] to-white border-b-2 border-gray-50">
        <div class="navbar-start">
            <div class="dropdown">
                <label tabindex="0" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </label>
            <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <!-- <RouterLink :to="{ name: 'ujian.psikotest.index' }">
                            <li><a>Beranda</a></li>
                        </RouterLink>
                        <RouterLink :to="{ name: 'ujian.psikotest.paket' }">
                            <li><a>Paket</a></li>
                    </RouterLink> -->
                <li><span @click="goTo('studi-paket')">PAKET</span></li>
                <li><span @click="goTo('user-profile')">PROFILE</span></li>
                <li><a @click="doLogout()">LOGOUT</a></li>

                    <!-- <li><a>Proses</a></li> -->
                </ul>
            </div>
            <span class="btn btn-ghost normal-case text-xl"> UJIAN STUDI </span>
            <!-- <RouterLink :to="{ name: 'ujian.psikotest.paket' }">
                    <span class="btn btn-ghost normal-case text-xl"> UJIAN </span>
                </RouterLink> -->
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
                <!-- <RouterLink :to="{ name: 'ujian.psikotest.index' }">
                        <li><a>BERANDA</a></li>
                    </RouterLink>
                    <RouterLink :to="{ name: 'ujian.psikotest.paket' }">
                        <li><a>PAKET</a></li>
                    </RouterLink> -->
                <li><span @click="goTo('studi-paket')" class="font-bold underline text-blue-400">PAKET</span></li>
                <li><span @click="goTo('user-profile')">PROFILE</span></li>
                <li><a @click="doLogout()">LOGOUT</a></li>
                <!-- <li><a>Proses</a></li> -->
            </ul>
        </div>
        <div class="navbar-end space-x-2">
        </div>
    </div>
</template>