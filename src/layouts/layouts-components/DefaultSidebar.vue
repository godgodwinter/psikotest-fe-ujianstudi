<script setup>
import Api from "@/axios/axios";
import ApiNode from "@/axios/axiosNode";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import { useUjianstudiPagesStore } from "../../stores/ujianstudi/ujianstudiPagesStore";
import API from "@/services/siswaAuthServices";
import { useTimerStore } from "@/stores/timerStore";
import { fnNumberToAlphabet } from "@/components/lib/babengHelper"
import Toast from "@/components/lib/Toast";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);

const ujianstudiPagesStore = useUjianstudiPagesStore();
const router = useRouter();
const timerStore = useTimerStore();
const fn_delay_redirect = (state) => {
    // console.log('====================================');
    // console.log(state.waktu);
    // console.log('====================================');
    if (state.waktu == 0) {
        // getData();
        // ujian_aktif.value = ujianstudiPagesStore.get_siswa_ujianstudi_aktif
        // data_soal.value = ujianstudiPagesStore.get_siswa_ujianstudi_aktif.soal
        router.push({
            name: "studi-paket",
            // params: { aspek_id: id }
        });
    }
}
timerStore.$subscribe(
    (mutation, state) => {
        // setTimeout(fn_delay_redirect(state), 2000, 'argumen example');
        fn_delay_redirect(state)

        waktu.value = timerStore.getWaktu;
    },
    { detached: false }
); //jika detached true :terpisah meskipun komponent di unmount subcrib tetap dijalankan [bug jika halaman di buka 2x akan dieksekusi 2x]
ujianstudiPagesStore.$subscribe(
    (mutation, state) => {
        if (ujianstudiPagesStore.get_siswa_ujianstudi_aktif) {
            ujian_aktif.value = state.siswa_ujianstudi_aktif
            data_soal.value = ujianstudiPagesStore.get_siswa_ujianstudi_aktif.soal
        }
    },
    { detached: false }
); //jika detached true :terpisah meskipun komponent di unmount subcrib tetap dijalankan [bug jika halaman di buka 2x akan dieksekusi 2x]
const waktu = ref(0);
const ujian_aktif = ref([])
const data_soal = ref([])

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
const goToSoal = (index, soal) => {
    ujianstudiPagesStore.set_siswa_ujianstudi_soal_aktif(soal, index)
    timerStore.do_run_disabled_button_save()
    router.push({ name: 'studi-proses-soal', params: { index } })
}

const periksaJawaban = (soal, kode_jawaban) => {
    let result = "-"
    // console.log(soal, kode_jawaban);
    for (const [index, item] of soal.pilihanjawaban.entries()) {
        if (item.kode_jawaban === kode_jawaban) {
            // console.log(index);
            return fnNumberToAlphabet(index + 1)
        }
    }
    return result
}

const getSemuaMapel = ref(ujianstudiPagesStore.get_siswa_ujianstudi);
const fn_check_index_mapel_aktif = (id) => {
    // get semua mapel
    for (const [index_mapel, mapel] of getSemuaMapel.value.entries()) {
        if (mapel.id === id) {
            return index_mapel;
        }
    }
    return null;
    // periksa yang id nya sama kemudian return index
}
const doSelesai = async () => {
    let getMapelAktif = ujianstudiPagesStore.get_siswa_ujianstudi_aktif;
    let aspekdetail_index = fn_check_index_mapel_aktif(getMapelAktif.id);
    if (confirm("Apakah anda yakin mengkhiri mapel ini?")) {
        // 1. stop interval timer 
        timerStore.doClearInterval();

        // 2. update tgl_selesai pada ujian aktive menjadi dateNow
        // 3. set mapel aktif = null
        // 4.  set soal aktif=null
        // 5. redirect to paket
        let dataMapel = ujianstudiPagesStore.get_siswa_ujianstudi;
        let dataMapel_aktif = ujianstudiPagesStore.get_siswa_ujianstudi_aktif;
        for (const [index_mapel, item_mapel] of dataMapel.entries()) {
            // console.log('====================================');
            // console.log(item_mapel, dataMapel_aktif);
            // console.log('====================================');
            if (item_mapel.id === dataMapel_aktif.id) {
                // console.log('====================================');
                // console.log(item_mapel.tgl_selesai, item_mapel, moment());
                // console.log('====================================');
                item_mapel.tgl_selesai = moment().format();
            }
        }
        // console.log('====================================');
        // console.log(dataMapel);
        // console.log('====================================');
        ujianstudiPagesStore.set_siswa_ujianstudi(dataMapel)
        ujianstudiPagesStore.set_siswa_ujianstudi_soal_aktif(null)
        ujianstudiPagesStore.set_siswa_ujianstudi_aktif(null)
        console.log('====================================');
        console.log(aspekdetail_index);
        console.log('====================================');
        try {
            let dataFormSend = {
                aspekdetail_index
            }
            const response = await ApiNode.post(`siswa/ujianstudi/aspek_detail/${dataMapel_aktif.id}/finish`, dataFormSend);
            // console.log(response);
            // Toast.success("Info", "Berhasil memulai !");
            // onKlik(tgl_selesai, aspek_detail_id.value, index.value)
            // setTimeout(fnPending, defaultPendingLogin, false);
            console.log("ujian berhasil diakhiri");
            // return true;
        } catch (error) {
            // setTimeout(fnPending, defaultPendingLogin, false);
            console.log("ujian gagal diakhiri");
            console.error(error);
        }
        Toast.danger("Warning", " Ujian berhasil diakhiri!");
        router.push({
            name: "studi-paket",
            // params: { aspek_id: id }
        });
    }
}
</script>
<template>
    <aside :class="{ hidden: !isSideBarActive }" id="sidebar"
        class="fixed z-20 h-full top-16 left-0 pt-4 flex lg:flex flex-shrink-0 flex-col w-64 lg:w-72 transition-width duration-75 bg-gray-50 shadow"
        aria-label="Sidebar">
        <div class="relative flex-1 flex flex-col min-h-0 ">
            <div class="flex-1 flex flex-col  pb-4 overflow-y-auto">
                <div class="flex-1 px-3 space-y-1">
                    <ul class="space-y-1 pb-2 lg:flex flex-wrap px-2 gap-0 justify-between">
                        <li class="lg:w-full py-0 " v-if="waktu > 0">
                            <h2
                                class="text-base-content font-bold rounded-lg flex items-center pt-4  group hover:link underline uppercase ">
                                {{ ujian_aktif.aspek_detail_nama }}
                            </h2>
                        </li>
                        <li class="lg:w-full py-0" v-if="waktu > 0">
                            <h3
                                class="text-base-content font-bold rounded-lg flex items-center pt-4  group hover:link underline">
                                MENU UJIAN
                            </h3>
                        </li>
                        <span v-if="waktu > 0">
                            <!-- {{ ujian_aktif.soal }} -->
                            <div class="w-full font-bold text-xs py-4">
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="item, index in data_soal" :key="item.id">
                                        <span @click="goToSoal(index, item)" class="btn btn-xs btn-info"
                                            v-if="item.kode_jawaban">{{ index + 1 }}. {{
                                                periksaJawaban(item, item.kode_jawaban) }}</span>
                                        <span @click="goToSoal(index, item)" class="btn btn-xs btn-warning" v-else>{{ index
                                            +
                                            1
                                        }}.
                                            <!-- {{ fnNumberToAlphabet(1) }} -->
                                        </span>
                                    </span>
                                </div>
                            </div>
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
                        <!-- {{ data_soal }} -->
                    </ul>
                </div>
            </div>
        </div>
    </aside>
</template>
