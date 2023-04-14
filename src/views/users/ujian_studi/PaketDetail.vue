<script setup>
import { ref, computed, defineAsyncComponent } from "vue"
import { useUjianstudiPagesStore } from "@/stores/ujianstudi/ujianstudiPagesStore";
import { useRoute, useRouter } from "vue-router";
import Toast from "@/components/lib/Toast";
import { useTimerStore } from "@/stores/timerStore";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
import { defaultPendingLogin } from "@/components/lib/babengHelper";
import Api from "@/axios/axiosNode";

const LoadingNavbar = defineAsyncComponent(() =>
    import('@/components/alert/AlertLoading.vue')
)


moment.updateLocale("id", localization);
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

const router = useRouter()
const route = useRoute()
const aspek_detail_id = ref(route.params.aspek_detail_id)
const index = ref(route.params.index)
const ujianstudiPagesStore = useUjianstudiPagesStore();
const data = ref(null)
const data_asli = ref(ujianstudiPagesStore.get_siswa_ujianstudi)

const dataMapel_aktif = ref(ujianstudiPagesStore.get_siswa_ujianstudi_aktif);
ujianstudiPagesStore.$subscribe(
    (mutation, state) => {
        dataMapel_aktif.value = ujianstudiPagesStore.get_siswa_ujianstudi_aktif;
    },
    { detached: false }
); //jika detached true :terpisah meskipun komponent di unmount subcrib tetap dijalankan [bug jika halaman di buka 2x akan dieksekusi 2x]

const getData = () => {
    try {
        data.value = data_asli.value.find((item) => item.id == aspek_detail_id.value)
        // console.log(data_asli.value, aspek_detail_id.value, data.value);
        return true;
    } catch (error) {
        console.error(error);
    }
}

const fn_delay_response = (args) => {
    getData()
}

setTimeout(fn_delay_response, 2000, 'argumen example');


const goToSoal = (index, soal) => {
    ujianstudiPagesStore.set_siswa_ujianstudi_soal_aktif(soal, index)
    router.push({ name: 'studi-proses-soal', params: { index } })
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

const doMulai = async () => {
    btnLoading.value = true
    if (waktu.value == 0) {
        let tgl_mulai = moment();
        let tgl_selesai = moment(tgl_mulai).add(data.value.waktu, 'minutes')
        // console.log('====================================');
        // console.log(`mulai mapel_id ${aspek_detail_id.value} , index:${index.value}`);
        // console.log(`tgl_mulai ${tgl_mulai} tgl_selesai ${tgl_selesai}`);

        // console.log('====================================');
        // onKlik(tgl_selesai, aspek_detail_id.value, index.value)
        // console.log(getMapelAktif, ujianstudiPagesStore.get_siswa_ujianstudi_soal_aktif);

        let aspekdetail_index = index.value;
        // console.log('====================================');
        // console.log(aspekdetail_index);
        // console.log('====================================');
        try {
            let dataFormSend = {
                tgl_mulai: moment(tgl_mulai).format(),
                tgl_selesai: moment(tgl_selesai).format(),
                aspekdetail_index: aspekdetail_index,
            }
            // console.log('====================================');
            // console.log(dataFormSend);
            // console.log('====================================');
            const response = await Api.post(`siswa/ujianstudi/aspek_detail/${aspek_detail_id.value}/mulai`, dataFormSend);
            // console.log(response);
            Toast.success("Info", "Berhasil memulai !");
            onKlik(tgl_selesai, aspek_detail_id.value, index.value)
            setTimeout(fnPending, 2000, false);

            // await setTimeout(btnLoading.value = false, 2000, 'argumen example');

            return true;
        } catch (error) {
            setTimeout(fnPending, defaultPendingLogin, false);
            console.error(error);
        }
        setTimeout(fnPending, defaultPendingLogin, false);
    } else {
        Toast.warning("Gagal memulai", "Selesaikan paket aktif terlebih dahulu!")
    }
}

const onKlik = async (tgl_selesai, aspek_detail_id, index) => {
    await timerStore.doJalankanTimerV2_tgl_selesai(tgl_selesai, aspek_detail_id, index);
    await timerStore.doPeriksaUjianAktif();

    // goToSoal(0, dataMapel_aktif.value.soal[0])
};
const goToMulai = async () => {
    // await timerStore.doJalankanTimerV2_tgl_selesai(tgl_selesai, aspek_detail_id, index);
    // await timerStore.doPeriksaUjianAktif();

    goToSoal(0, dataMapel_aktif.value.soal[0])
};


const btnLoading = ref(true);
const fnPending = (status) => {
    btnLoading.value = false
}
setTimeout(fnPending, defaultPendingLogin, false);
</script>
<template>
    <div v-if="data">
        <!-- {{ data }} {{ aspek_detail_id }} -->
        <div class="p-4">
            <div class="flex m-4 lg:m-6 justify-center">

                <div class="grid-cols-1 w-96">
                    <article class="prose">
                        <!-- {{ waktu }} -->
                        <h2>{{ data.aspek_detail_nama }}</h2>
                        <h4>Durasi : {{ data.waktu }} menit</h4>
                        <h4>Jumlah Soal : {{ data.soal.length }} Soal</h4>
                    </article>
                </div>
            </div>

            <div class="divider"></div>
            <div class=" bg-gray-100 m-1 p-3 rounded-md text-justify w-full" v-if="data.instruksi_status == 'Aktif'">
                <article class="prose ">
                    <h2>INSTRUKSI :</h2>

                    <span class="w-full" v-html="data.instruksi"></span>
                </article>
            </div>
            <div class="divider"></div>
            <div v-if="data.lembar_prasoal_status == 'Aktif'">
                <div class=" bg-gray-100 m-1 p-3 rounded-md text-justify w-full">
                    <article class="prose ">
                        <h2>LEMBAR PRASOAL :</h2>

                        <span class="w-full" v-html="data.lembar_prasoal"></span>
                    </article>
                </div>
                <div class="divider"></div>
            </div>
            <div v-if="data.instruksi_pengerjaan_status == 'Aktif'">
                <div class=" bg-gray-100 m-1 p-3 rounded-md text-justify w-full">
                    <article class="prose">
                        <h2>INSTRUKSI PENGERJAAN :</h2>

                        <span class="w-full" v-html="data.instruksi_pengerjaan"></span>
                    </article>
                </div>
                <div class="divider"></div>
            </div>
            <div>
                <div class="w-full flex justify-center px-4">
                    <button class="btn btn-lg bg-slate-500" v-if="btnLoading" disabled> <img
                            src="@/assets/img/animate/native-loader-2.svg" class="text-white fill-current px-2" alt="">
                        Processing ...</button>
                    <span v-else> <button class="btn btn-lg btn-primary" @click="doMulai()"
                            v-if="data.tgl_mulai === null">Daftar</button>
                        <button class="btn btn-lg btn-success" v-else @click="goToMulai()">Lihat Soal</button></span>

                </div>
            </div>
            <div class="divider"></div>
        </div>
    </div>
    <div v-else>
        <div class="p-2">
            <LoadingNavbar />
        </div>
    </div>
</template>