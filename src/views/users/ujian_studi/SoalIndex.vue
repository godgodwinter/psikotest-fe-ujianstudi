<script setup>
import { ref, computed, defineAsyncComponent } from "vue"
import { useRoute, useRouter } from "vue-router";
import { fnNumberToAlphabet } from "@/components/lib/babengHelper"
import { useUjianstudiPagesStore } from "@/stores/ujianstudi/ujianstudiPagesStore";
import Toast from "@/components/lib/Toast";
import { useTimerStore } from "@/stores/timerStore";
import Api from "@/axios/axiosNode";
const ujianstudiPagesStore = useUjianstudiPagesStore();
const timerStore = useTimerStore();
const route = useRoute()
const router = useRouter()
const data = ref(null)
const index = ref(route.params.index)
const no_soal = ref(parseInt(index.value) + 1)
const loading = ref(true);

const AlertLoading = defineAsyncComponent(() =>
    import('@/components/alert/AlertLoading.vue')
)

const buttonSaveDisabled = ref(3)
timerStore.do_run_disabled_button_save()
// console.log(buttonSaveDisabled.value);
const soal_index = ref(0);

timerStore.$subscribe(
    (mutation, state) => {
        if (state.waktu == 0) {
            // getData();
            // ujian_aktif.value = ujianstudiPagesStore.get_siswa_ujianstudi_aktif
            // data_soal.value = ujianstudiPagesStore.get_siswa_ujianstudi_aktif.soal
            // router.push({
            //     name: "studi-paket",
            //     // params: { aspek_id: id }
            // });
        }
        waktu.value = timerStore.getWaktu;
        buttonSaveDisabled.value = timerStore.get_buttonSaveLoading;
        // console.log(buttonSaveDisabled.value);
    },
    { detached: false }
); //jika detached true :terpisah m
const waktu = ref(0);
ujianstudiPagesStore.$subscribe(
    (mutation, state) => {
        // fn_delay_response
        // console.log('====================================');
        // console.log(ujianstudiPagesStore.get_siswa_ujianstudi_soal_aktif);
        // console.log('====================================');
        // console.log("here", ujianstudiPagesStore.get_siswa_ujianstudi_soal_aktif);
        data.value = ujianstudiPagesStore.get_siswa_ujianstudi_soal_aktif;
        soal_index.value = ujianstudiPagesStore.get_soal_index;
    },
    { detached: false }
); //jika detached true :terpisah meskipun komponent di unmount subcrib tetap dijalankan [bug jika halaman di buka 2x akan dieksekusi 2x]

const soal_jml = ref(0);
const dataMapel_aktif = ref(ujianstudiPagesStore.get_siswa_ujianstudi_aktif);
const getSemuaMapel = ref(ujianstudiPagesStore.get_siswa_ujianstudi);
const fn_delay_response = async (args) => {
    // console.log(ujianstudiPagesStore.get_siswa_ujianstudi_aktif);
    // data.value = await getSoal(ujianstudiPagesStore.get_siswa_ujianstudi_aktif, index.value)
    data.value = ujianstudiPagesStore.get_siswa_ujianstudi_soal_aktif;
    if (data.value === null) {
        if (ujianstudiPagesStore.get_siswa_ujianstudi_aktif) {

            data.value = ujianstudiPagesStore.get_siswa_ujianstudi_aktif.soal[index.value]
            // console.log(data.value);
            ujianstudiPagesStore.set_siswa_ujianstudi_soal_aktif(data.value, index.value)
        }
    }
    loading.value = false
    dataMapel_aktif.value = ujianstudiPagesStore.get_siswa_ujianstudi_aktif;
    soal_jml.value = dataMapel_aktif.value?.soal?.length;
    // console.log("datamapel", dataMapel_aktif.value.soal[soal_index.value + 1]);
}

// const getSoal = async (dataMapel, index) => {
//     let result = null;
//     // result = dataMapel.soal[index]
//     result = ujianstudiPagesStore.get_siswa_ujianstudi_soal_aktif
//     // console.log(result);
//     return result
// }
setTimeout(fn_delay_response, 2000, 'argumen example');


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
const doStoreData = async (kode_jawaban) => {
    buttonSaveDisabled.value = 5;
    // console.log(kode_jawaban);
    let getMapelAktif = ujianstudiPagesStore.get_siswa_ujianstudi_aktif;
    // console.log(getMapelAktif, ujianstudiPagesStore.get_siswa_ujianstudi_soal_aktif);
    for (const [index_soal, item] of getMapelAktif.soal.entries()) {
        if (item.id === ujianstudiPagesStore.get_siswa_ujianstudi_soal_aktif.id) {
            getMapelAktif.soal[index_soal].kode_jawaban = kode_jawaban;
            ujianstudiPagesStore.set_siswa_ujianstudi_soal_aktif(getMapelAktif.soal[index_soal], index_soal, true);
        }
    }
    let aspekdetail_index = fn_check_index_mapel_aktif(getMapelAktif.id);

    try {
        let dataFormSend = {
            kode_jawaban,
            aspekdetail_index: aspekdetail_index,
            soal_index: data.value.index,
        }
        console.log('====================================');
        console.log("soal_id:", data.value.id, dataFormSend, getMapelAktif);
        console.log('====================================');
        const response = await Api.post(`siswa/ujianstudi/aspek_detail/jawab/${data.value.id}`, dataFormSend);
        // console.log(response);
        // Toast.success("Info", "Berhasil menyimpan jawaban !");
        // onKlik(tgl_selesai, aspek_detail_id.value, index.value)
        // setTimeout(fnPending, defaultPendingLogin, false);
        console.log('====================================');
        console.log("berhasil menyimpan jawaban!");
        console.log('====================================');
    } catch (error) {
        setTimeout(fnPending, defaultPendingLogin, false);
        console.error(error);
    }

    timerStore.do_run_disabled_button_save()

    // ujianstudiPagesStore.set_siswa_ujianstudi_soal_aktif(getMapelAktif.soal, true);
    // Toast.babeng("Info", "Jawaban berhasil disimpan")
    // console.log('====================================22');
    // console.log(ujianstudiPagesStore.get_siswa_ujianstudi_soal_aktif);
    // console.log('====================================');
    // data.value = ujianstudiPagesStore.get_siswa_ujianstudi_soal_aktif
    // console.log(getMapelAktif);

}


const goToSoal = (index, soal) => {
    ujianstudiPagesStore.set_siswa_ujianstudi_soal_aktif(soal, index)
    timerStore.do_run_disabled_button_save()
    router.push({ name: 'studi-proses-soal', params: { index } })
}

const goBack = (indexNow) => {
    let indexNext = parseInt(indexNow) - 1;
    goToSoal(indexNext, dataMapel_aktif.value.soal[(soal_index.value) - 1])
}
const goNext = (indexNow) => {
    let indexNext = parseInt(indexNow) + 1;
    goToSoal(indexNext, dataMapel_aktif.value.soal[(soal_index.value) + 1])
}
</script>
<template>
    <div v-if="loading">
        <AlertLoading />
    </div>
    <div v-else>
        <div v-if="waktu > 0">
            <div v-if="data">

                <div class="px-2 pt-2 w-full lg:flex justify-between gap-2 space-y-2">
                    <div class="prose space-x-2 px-2">
                        <!-- <h2 class="text-2xl font-bold">NO 1:</h2> -->

                        <button class="btn btn-outline gap-2">
                            NO SOAL
                            <!-- <div class="badge badge-info ">1</div> -->
                            <span class="font-bold text-lg">{{ data.index + 1 }}</span>
                        </button>

                        <!-- <button class="btn btn-primary gap-2">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              BELUM DIJAWAB
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <div class="badge badge-warning">5</div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </button> -->
                    </div>
                    <div class="w-96 pb-0 ">
                        <!-- {{ soal_index }} -
                                                                                                                                                                                                                                                    {{ soal_jml }} -->
                        <div class=" lg:flex justify-end px-2 space-x-2 ">
                            <button @click="goBack(soal_index)" v-if="soal_index > 0">
                                <button class="btn btn-sm btn-accent">Sebelumnya</button>
                            </button>
                            <button @click="goNext(soal_index)" v-if="soal_index < parseInt(soal_jml) - 1">
                                <button class="btn btn-sm btn-info">Selanjutnya </button>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="m-4 pb-4 rounded shadow">
                    <div class="p-0">
                        <div class="card w-full bg-info/10 shadow-xl text-justify">
                            <div class="card-body">
                                <span class=" font-bold ">Pertanyaan : </span>
                                <span class="text-base" v-html="data.soal_pertanyaan">
                                </span>
                                <div class="divider"></div>
                                <span class="font-extralight text-xs">
                                    <span class="font-bold">Status tombol simpan :
                                        <span class="text-error font-bold" v-if="buttonSaveDisabled > 0">
                                            Mohon Tunggu ! <img src="@/assets/img/animate/native-loader-2.svg"
                                                class="text-white fill-current px-2" alt="">
                                        </span>
                                        <span class="text-success font-bold" v-else>
                                            Bisa menyimpan!
                                        </span>
                                    </span>
                                    <!-- <span>{{ data.jawaban_tersimpan ? fnNumberToAlphabet(data.jawaban_tersimpan) : "-" }}</span> -->
                                    <!-- <div class="divider"></div> -->
                                    <span v-html="data?.paketsoal_pilihanjawaban?.jawaban">

                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <!-- {{ linkStore }} -->
                    <div class="px-4 lg:px-10" v-if="data?.pilihanjawaban">
                        <div class="p-4" v-for="item, index in data.pilihanjawaban" :key="item.id">
                            <span v-if="buttonSaveDisabled > 0">
                                <div class="card w-full bg-slate-500 shadow-md hover:shadow-lg text-justify"
                                    v-if="data?.kode_jawaban == item.kode_jawaban">
                                    <div class="card-body">

                                        <span class=" font-bold ">{{ fnNumberToAlphabet(index + 1) }} . </span>
                                        <p class="text-base" v-html="item.jawaban">
                                        </p>
                                    </div>
                                </div>
                                <div class="card w-full bg-slate-500 shadow-md hover:shadow-lg text-justify " v-else>
                                    <div class="card-body">
                                        <span class=" font-bold ">{{ fnNumberToAlphabet(index + 1) }} . </span>

                                        <p class="text-base" v-html="item.jawaban">
                                        </p>
                                    </div>
                                </div>
                            </span>
                            <span @click="doStoreData(item.kode_jawaban)" v-else>
                                <div class="card w-full bg-info shadow-md hover:shadow-lg text-justify"
                                    v-if="data?.kode_jawaban == item.kode_jawaban">
                                    <div class="card-body">
                                        <span class=" font-bold ">{{ fnNumberToAlphabet(index + 1) }} . </span>
                                        <p class="text-base" v-html="item.jawaban">
                                        </p>
                                    </div>
                                </div>
                                <div class="card w-full bg-base-200 shadow-md hover:shadow-lg text-justify " v-else>
                                    <div class="card-body">
                                        <span class=" font-bold ">{{ fnNumberToAlphabet(index + 1) }} . </span>
                                        <p class="text-base" v-html="item.jawaban">
                                        </p>
                                    </div>
                                </div>

                            </span>
                        </div>

                    </div>

                </div>

                <!-- <div class="divider"></div> -->
                <div class="pb-5">
                    <!-- {{ soal_index }} -
                                                                                                                                                                                                                                                        {{ soal_jml }} -->
                    <div class="w-full flex justify-end px-4 space-x-2">
                        <button @click="goBack(soal_index)" v-if="soal_index > 0">
                            <button class="btn btn-sm btn-accent">Sebelumnya</button>
                        </button>
                        <button @click="goNext(soal_index)" v-if="soal_index < parseInt(soal_jml) - 1">
                            <button class="btn btn-sm btn-info">Selanjutnya </button>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>

            <div class="alert alert-error shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        class="stroke-info flex-shrink-0 w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Error! Task failed : </span>
                    <span> Waktu telah habis!</span>
                </div>
            </div>
        </div>
    </div>
</template>