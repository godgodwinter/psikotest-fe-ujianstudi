import { ref, computed } from "vue";
import { defineStore } from "pinia";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);
// import { useRouter } from "vue-router";
// import Toast from "@/components/lib/Toast.js";

export const useUjianstudiPagesStore = defineStore("ujianstudiPagesStore", () => {

    // State
    const isSidebarActive = ref(false);
    // Getter Setter
    const getIsSidebarActive = computed(() => isSidebarActive.value);
    const setIsSidebarActive = (item) => {
        isSidebarActive.value = item;
    };
    const toggleSideBar = () => {
        isSidebarActive.value = !isSidebarActive.value;
    }
    // const router = useRouter();
    // State
    const siswa_profile = ref(localStorage.getItem("siswa_profile") ? JSON.parse(localStorage.getItem("siswa_profile")) : null);
    // Getter Setter
    const get_siswa_profile = computed(() => siswa_profile.value);
    const set_siswa_profile = (item) => {
        localStorage.setItem("siswa_profile", JSON.stringify(item))
        siswa_profile.value = item;
    };
    const siswa_ujianstudi = ref(localStorage.getItem("siswa_ujianstudi") ? JSON.parse(localStorage.getItem("siswa_ujianstudi")) : null); //![] semua mapel
    // Getter Setter
    const get_siswa_ujianstudi = computed(() => siswa_ujianstudi.value);
    const set_siswa_ujianstudi = (item) => {
        localStorage.setItem("siswa_ujianstudi", JSON.stringify(item))
        siswa_ujianstudi.value = item;
    };
    const siswa_ujianstudi_aktif = ref(null); //!{} satu mapel yang aktif
    // Getter Setter
    const get_siswa_ujianstudi_aktif = computed(() => siswa_ujianstudi_aktif.value); //!{} satu mapel yang aktif
    const set_siswa_ujianstudi_aktif = (item) => {
        siswa_ujianstudi_aktif.value = item;
    };

    const siswa_ujianstudi_soal_aktif = ref(null)
    const get_siswa_ujianstudi_soal_aktif = computed(() => siswa_ujianstudi_soal_aktif.value)
    const set_siswa_ujianstudi_soal_aktif = (item, index = 0, is_updated = false) => {
        if (item) {
            soal_index.value = index;
            // console.log(item);
            item.index = index
            siswa_ujianstudi_soal_aktif.value = item;
            // // console.log('====================================');
            // // console.log(siswa_ujianstudi_soal_aktif.value);
            // // console.log('====================================');
            if (is_updated) {
                // ! 1. update mapel_aktif    //siswa_ujianstudi_aktif
                // ! 2. update   localstroage //siswa_ujianstudi
                for (const [index_mapel, item_mapel] of siswa_ujianstudi.value.entries()) {
                    if (item_mapel.id === siswa_ujianstudi_aktif.value.id) {
                        // siswa_ujianstudi_aktif.value.soal[index] = item
                        siswa_ujianstudi.value[index_mapel] = siswa_ujianstudi_aktif.value
                        // console.log(siswa_ujianstudi_aktif.value);
                    }
                }
                set_siswa_ujianstudi(siswa_ujianstudi.value)
                //     //! set_siswa_ujianstudi(siswa_ujianstudi.value)
            }
        } else {
            siswa_ujianstudi_soal_aktif.value = null;
        }

    }

    const soal_index = ref(0);
    const set_soal_index = (index) => {
        soal_index.value = index;
    }
    const get_soal_index = computed(() => soal_index.value)

    return {
        isSidebarActive,
        getIsSidebarActive,
        setIsSidebarActive,
        toggleSideBar,
        siswa_profile,
        get_siswa_profile,
        set_siswa_profile,
        siswa_ujianstudi,
        get_siswa_ujianstudi,
        set_siswa_ujianstudi,
        siswa_ujianstudi_aktif,
        get_siswa_ujianstudi_aktif,
        set_siswa_ujianstudi_aktif,
        siswa_ujianstudi_soal_aktif,
        get_siswa_ujianstudi_soal_aktif,
        set_siswa_ujianstudi_soal_aktif,
        get_soal_index,
        set_soal_index,
        soal_index

    };
});
