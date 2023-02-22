<script setup>
import Api from "@/axios/axios";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import { useUjianstudiPagesStore } from "../../stores/ujianstudi/ujianstudiPagesStore";
import API from "@/services/siswaAuthServices";
import { useTimerStore } from "@/stores/timerStore";
import { fnNumberToAlphabet } from "@/components/lib/babengHelper"

const ujianstudiPagesStore = useUjianstudiPagesStore();
const router = useRouter();
const timerStore = useTimerStore();
const waktu = computed(() => timerStore.getWaktu);
const ujian_aktif = computed(() => ujianstudiPagesStore.get_siswa_ujianstudi_aktif)

const pagesActive = ujianstudiPagesStore.getPagesActive;
const getIdentitas = ujianstudiPagesStore.getIdentitas;
const isSideBarActive = ref(ujianstudiPagesStore.isSidebarActive);
const superadmin = ref(ujianstudiPagesStore.superadmin);
ujianstudiPagesStore.$subscribe((mutation, state) => {
    isSideBarActive.value = ujianstudiPagesStore.isSidebarActive;
    superadmin.value = ujianstudiPagesStore.superadmin;
});
const pagesActiveClass = ref(
    "border border-info rounded-lg bg-info text-info-content"
);
const toggleSideBar = () => {
    ujianstudiPagesStore.toggleSideBar();
}
const doLogout = async () => {
    if (confirm("Apakah anda yakin untuk Logout ?")) {
        const res = await API.doLogout();
        if (res === true) {
            router.push({ name: "Login" });
        }
    }
};
</script>
<template>
    <aside :class="{ hidden: !isSideBarActive }" id="sidebar"
    class="fixed z-20 h-full top-16 left-0 pt-4 flex lg:flex flex-shrink-0 flex-col w-64 lg:w-72 transition-width duration-75 bg-gray-50 shadow"
    aria-label="Sidebar">
    <div class="relative flex-1 flex flex-col min-h-0 ">
        <div class="flex-1 flex flex-col  pb-4 overflow-y-auto">
            <div class="flex-1 px-3 space-y-1">
                <ul class="space-y-1 pb-2 lg:flex flex-wrap px-2 gap-0 justify-between">
                    <li class="lg:w-full py-0" v-if="waktu > 0">
                        <h3
                            class="text-base-content font-bold rounded-lg flex items-center pt-4  group hover:link underline">
                                MENU UJIAN
                            </h3>
                        </li>
                        <!-- {{ ujian_aktif }} -->
                        <span v-if="waktu > 0">
                            <div class="w-full font-bold text-xs py-4">
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="item, index in ujian_aktif.soal" :key="item.id">
                                        <a class="btn btn-xs btn-info" v-if="item.kode_jawaban">{{ index + 1 }}. </a>
                                        <a class="btn btn-xs btn-warning">{{ index + 1 }}.
                                            <!-- {{ fnNumberToAlphabet(1) }} -->
                                        </a>
                                    </span>
                                </div>
                            </div>
                            <!-- <div class="flex flex-wrap gap-2">
                                                                                            <span>
                                                                                                <a class="btn btn-xs btn-info">01. A </a>
                                                                                            </span>
                                                                                            <span>
                                                                                                <a class="btn btn-xs btn-info">02. A </a>
                                                                                            </span>
                                                                                            <span>
                                                                                                <a class="btn btn-xs btn-info">03. C </a>
                                                                                            </span>
                                                                                            <span>
                                                                                                <a class="btn btn-xs btn-info">04. D </a>
                                                                                            </span>
                                                                                            <span>
                                                                                                <a class="btn btn-xs btn-info">04. D </a>
                                                                                            </span>
                                                                                            <span>
                                                                                                <a class="btn btn-xs btn-info">04. D </a>
                                                                                            </span>
                                                                                            <span>
                                                                                                <a class="btn btn-xs btn-info">04. D </a>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div> -->
                        </span>
                        <span v-if="waktu > 0">
                            <button class="btn btn-error btn-md" @click="doSelesai()">
                                FINISH
                            </button>
                        </span>
                        <li class="lg:w-full py-0">
                            <h3
                                class="text-base-content font-bold rounded-lg flex items-center pt-4  group hover:link underline">
                                MENU UMUM
                            </h3>
                        </li>
                        <li class="lg:w-full py-0" :class="[pagesActive == 'dashboard' ? pagesActiveClass : '']">
                            <router-link :to="{ name: 'studi-paket' }"
                                class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                                <span class="ml-3">Paket </span>
                            </router-link>
                        </li>
                        <li class="lg:w-full py-0" :class="[pagesActive == 'dashboard' ? pagesActiveClass : '']">
                            <router-link :to="{ name: 'user-home' }"
                                class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="ml-3">Profile </span>
                            </router-link>
                        </li>
                        <li class="lg:w-full py-0" :class="[pagesActive == 'sekolah' ? pagesActiveClass : '']">
                            <span @click="doLogout()"
                                class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="ml-3">Logout </span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </aside>
</template>
