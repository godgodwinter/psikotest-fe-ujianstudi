<script setup>
import { ref, computed, defineAsyncComponent } from "vue"
import { useUjianstudiPagesStore } from "@/stores/ujianstudi/ujianstudiPagesStore";
import { useRouter } from "vue-router";
import { fn_get_sisa_waktu } from "@/components/lib/babengHelper"
import { useTimerStore } from "@/stores/timerStore";
import Toast from "@/components/lib/Toast";
import API from "@/services/siswaAuthServices";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);
const router = useRouter()
const ujianstudiPagesStore = useUjianstudiPagesStore();
const waktu = ref(1);
const timerStore = useTimerStore();
const durasi_tunggu = ref(30); //1menit
const loading = ref(true);
const interval_reset_timer = ref(durasi_tunggu.value);

const AlertLoading = defineAsyncComponent(() =>
    import('@/components/alert/AlertLoading.vue')
)

const do_aktivkan_reset = async () => {
    interval_reset_timer.value = 0
}
const do_jalankan_timer_reset = async (counter = 0) => {
    if (counter < durasi_tunggu.value) {
        setTimeout(function () {
            interval_reset_timer.value--;
            counter++;
            // console.log(counter);
            do_jalankan_timer_reset(counter);
        }, 1000);
    }
    // setTimeout(do_aktivkan_reset, total, false);
}
do_jalankan_timer_reset(0);
timerStore.$subscribe(
    (mutation, state) => {
        waktu.value = timerStore.getWaktu;
        // timerReset.value = timerStore.get_interval_reset_timer;
        // console.log('====================================');
        // console.log(timerReset.value);
        // console.log('====================================');
    },
    { detached: false }
); //jika detached
const profile = computed(() => ujianstudiPagesStore.get_siswa_profile)
const ujianStudi = computed(() => ujianstudiPagesStore.siswa_ujianstudi)
const AlertFailed = defineAsyncComponent(() =>
    import('@/components/alert/AlertFailed.vue')
)
const data = ref(ujianstudiPagesStore.get_siswa_ujianstudi || [])
const getData = async () => {
    data.value = ujianstudiPagesStore.get_siswa_ujianstudi || [];
    loading.value = false
}
const doMulai = (aspek_detail_id, index) => {
    router.push({ name: "studi-paket-detail", params: { aspek_detail_id, index } })
}

let arr = [{
    id: 1,
    nama: 2
}, {
    id: 12,
    nama: 12
}]

const export_nama = ref(`${moment().format("YYYY_MM_DD-")}-${profile.value.id}-${profile.value.nama}`)

const exportJson = () => {
    if (confirm("Apakah anda yakin export data ini?")) {
        let dataExport = {
            profile: profile.value,
            dataUjian: ujianStudi.value
        }
        const data = JSON.stringify(dataExport)
        const blob = new Blob([data], { type: 'text/plain' })
        const e = document.createEvent('MouseEvents'),
            a = document.createElement('a');
        a.download = `${export_nama.value}.json`;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    };
}
const refreshDataUjian = async (w = waktu.value) => {
    loading.value = true
    // console.log('====================================');
    // console.log(w);
    // console.log('====================================');
    if (confirm("Apakah anda yakin refresh data ini?")) {
        if (w < 1) {
            //! timer harus 0
            // console.log('====================================');
            // console.log("refresh Data");
            // console.log('====================================');
            try {
                const res = await API.getAspekDetail();
                data.value = ujianstudiPagesStore.get_siswa_ujianstudi || [];
                interval_reset_timer.value = durasi_tunggu.value
                do_jalankan_timer_reset(0)
                // await do_jalankan_timer_reset(durasi_tunggu.value);
                loading.value = false
                console.log('====================================');
                console.log(durasi_tunggu.value, interval_reset_timer.value);
                console.log('====================================');
            } catch (error) {
                loading.value = false
                console.error(error);
            }
        } else {
            loading.value = false
            Toast.babeng("Gagal", "Selesaikan proses aktif terlebih dahulu")
        }
    };
}
const fn_waktu_default = () => {
    getData();
    waktu.value = 0;
}
// timerStore.do_run_reset_timer()
setTimeout(fn_waktu_default, 3000, false);
</script>
<template>
    <div v-if="loading">
        <AlertLoading />
    </div>
    <div v-else>
        <div class="p-4" v-if="data.length < 1">
            <div class="alert alert-error shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        class="stroke-current flex-shrink-0 w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Ujian aktif tidak ditemukan!</span>
                </div>
            </div>
            <div class="py-2 space-x-2">
                <!-- <button class="btn btn-warning btn-sm" @click="exportJson()">Export Data Ujian</button> -->
                <!-- {{ waktu }} -->
                <button class="btn btn-error btn-sm" @click="refreshDataUjian()" v-if="interval_reset_timer < 1">Refresh
                    Data
                    Ujian</button>
                <button class="btn btn-dark btn-sm" v-else>Refresh Data Ujian</button>
                <!-- <p>{{ timerReset }}</p> -->
                <p>Refresh data ujian aktif dalam : {{ interval_reset_timer }} Detik</p>
            </div>
        </div>
        <div class="py-10 p-4 mx-2 rounded-lg border" v-else>
            <div class="py-2 space-x-2">
                <!-- <button class="btn btn-warning btn-sm" @click="exportJson()">Export Data Ujian</button> -->
                <!-- {{ waktu }} -->
                <button class="btn btn-error btn-sm" @click="refreshDataUjian()" v-if="interval_reset_timer < 1">Refresh
                    Data
                    Ujian</button>
                <button class="btn btn-dark btn-sm" v-else>Refresh Data Ujian</button>
                <!-- <p>{{ timerReset }}</p> -->
                <p>Refresh data ujian aktif dalam : {{ interval_reset_timer }} Detik</p>
            </div>
            <div class=" overflow-x-auto">
                <table class="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Aksi</th>
                            <th>Judul</th>
                            <th>Status</th>
                            <th>Waktu Pengerjaan</th>
                            <th>Jumlah Soal</th>
                            <!-- <th>Tipe</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item, index in data" :key="item.id">
                            <th>{{ index + 1 }}</th>
                            <td>
                                <span v-if="item.tgl_selesai">
                                    <span v-if="fn_get_sisa_waktu(item.tgl_selesai).detik > 0">
                                        <button class="btn btn-success btn-sm">Aktif</button></span>
                                    <span v-else>
                                        <button class="btn btn-error btn-sm">SELESAI</button>
                                    </span>
                                </span>
                                <span v-else>
                                    <button class="btn btn-info btn-sm" @click="doMulai(item.id, index)">MULAI</button>
                                </span>
                                <!-- <button class="btn btn-warning" v-else-if="item.status == 'selesai'">SELESAI</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <button class="btn btn-primary" v-else @click="doMulai(item.id, item.tipe)">MULAI</button> -->

                            </td>
                            <th>{{ item.aspek_detail_nama }}</th>
                            <td>
                                <span v-if="item.tgl_selesai">
                                    <span v-if="fn_get_sisa_waktu(item.tgl_selesai).detik > 0">Aktif</span>
                                    <span v-else>SELESAI</span>
                                </span>
                                <span v-else>Belum

                                    - {{ item.status }}
                                </span>

                            </td>
                            <td>{{ item.waktu }} menit</td>
                            <td>{{ item.soal.length }} soal</td>
                            <!-- <td>UJIAN STUDI</td> -->
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
