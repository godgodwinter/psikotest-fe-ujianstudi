<script setup>
import { ref, computed, defineAsyncComponent } from "vue"
import { useUjianstudiPagesStore } from "@/stores/ujianstudi/ujianstudiPagesStore";
import { useRouter } from "vue-router";
import { fn_get_sisa_waktu } from "@/components/lib/babengHelper"
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);
const router = useRouter()
const ujianstudiPagesStore = useUjianstudiPagesStore();

const profile = computed(() => ujianstudiPagesStore.get_siswa_profile)
const ujianStudi = computed(() => ujianstudiPagesStore.siswa_ujianstudi)
const AlertFailed = defineAsyncComponent(() =>
    import('@/components/alert/AlertFailed.vue')
)
const data = ref(ujianstudiPagesStore.get_siswa_ujianstudi || [])

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
}
</script>
<template>
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
    </div>
    <div class="py-10 p-4 mx-2 rounded-lg border" v-else>
        <div class="py-2">
            <button class="btn btn-warning btn-sm" @click="exportJson()">Export Data Ujian</button>
        </div>
        <div class="overflow-x-auto">
            <table class="table table-compact w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Aksi</th>
                        <th>Judul</th>
                        <th>Status</th>
                        <th>Waktu Pengerjaan</th>
                        <th>Jumlah Soal</th>
                        <th>Tipe</th>
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
                            <span v-else>Belum</span>

                        </td>
                        <td>{{ item.waktu }} menit</td>
                        <td>{{ item.soal.length }} soal</td>
                        <td>UJIAN STUDI</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
