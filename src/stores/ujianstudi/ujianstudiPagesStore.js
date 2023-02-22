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
    const siswa_ujianstudi_aktif = ref(localStorage.getItem("siswa_ujianstudi") ? JSON.parse(localStorage.getItem("siswa_ujianstudi")) : null); //!{} satu mapel yang aktif
    // Getter Setter
    const get_siswa_ujianstudi_aktif = computed(() => siswa_ujianstudi_aktif.value); //!{} satu mapel yang aktif
    const set_siswa_ujianstudi_aktif = (item) => {
        siswa_ujianstudi_aktif.value = item;
    };

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

    };
});
