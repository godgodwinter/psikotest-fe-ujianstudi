<script setup>
import { computed, ref } from "vue"
import { useRouter } from 'vue-router';
import API from "@/services/siswaAuthServices";
import { useTimerStore } from "@/stores/timerStore";
import { useUjianstudiPagesStore } from "../../stores/ujianstudi/ujianstudiPagesStore";
import Toast from "@/components/lib/Toast";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);

const ujianstudiPagesStore = useUjianstudiPagesStore();
const timerStore = useTimerStore();
timerStore.$subscribe(
    (mutation, state) => {
        if (state.waktu == 0) {
            // getData();
        }
    },
    { detached: false }
); //jika detached true :terpisah meskipun komponent di unmount subcrib tetap dijalankan [bug jika halaman di buka 2x akan dieksekusi 2x]
const waktu = computed(() => timerStore.getWaktu);
const timer = ref(10);

const onKlik = (time) => {
    timerStore.doJalankanTimer(time);
};
// onKlik(10)
const router = useRouter();
const doLogout = async () => {
    if (confirm("Apakah anda yakin untuk Logout ?")) {
        const res = await API.doLogout();
        if (res === true) {
            router.push({ name: "Login" });
        }
    }
};

const goTo = async (name) => {
    router.push({ name });
};

timerStore.doPeriksaUjianAktif();


const toggleSideBar = () => {
    ujianstudiPagesStore.toggleSideBar();
}

const dataMapel_aktif = ref(ujianstudiPagesStore.get_siswa_ujianstudi_aktif);
ujianstudiPagesStore.$subscribe(
    (mutation, state) => {
        dataMapel_aktif.value = ujianstudiPagesStore.get_siswa_ujianstudi_aktif;
    },
    { detached: false }
); //jika detached true :terpisah meskipun komponent di unmount subcrib tetap dijalankan [bug jika halaman di buka 2x akan dieksekusi 2x]

const goToSoal = (index, soal) => {
    ujianstudiPagesStore.set_siswa_ujianstudi_soal_aktif(soal, index)
    router.push({ name: 'studi-proses-soal', params: { index } })
}

const doResume = () => {
    goToSoal(0, dataMapel_aktif.value.soal[0])
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
            <span class="btn btn-ghost normal-case text-xl">UJIAN STUDI </span>
        </div>
        <div class="navbar-center hidden lg:flex">
            <div @click="doResume()" class="text-xl"> <span class="font-bold text-md underline" v-if="waktu > 0">
                    SOAL</span>
                <span class="px-4 font-bold text-slate-600" v-if="waktu > 120">
                    {{ moment.utc(waktu * 1000).format("HH:mm:ss") }}</span>
                <span class="px-4 font-bold text-red-600" v-else-if="waktu > 0">
                    {{ moment.utc(waktu * 1000).format("HH:mm:ss") }}</span>
                <span v-else></span>
            </div>
        </div>
        <div class="navbar-end space-x-2 md:hidden">
            <div @click="doResume()" class="text-lg"> <span class="font-bold text-md underline" v-if="waktu > 0">
                    SOAL</span>
                <span class="px-4 font-bold text-slate-600" v-if="waktu > 120">
                    {{ moment.utc(waktu * 1000).format("HH:mm:ss") }}</span>
                <span class="px-4 font-bold text-red-600" v-else-if="waktu > 0">
                    {{ moment.utc(waktu * 1000).format("HH:mm:ss") }}</span>
                <span v-else></span>
            </div>
        </div>
    </div>
</template>