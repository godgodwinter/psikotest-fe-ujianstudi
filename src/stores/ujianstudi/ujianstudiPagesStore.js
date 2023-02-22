import { ref, computed } from "vue";
import { defineStore } from "pinia";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);
// import { useRouter } from "vue-router";
// import Toast from "@/components/lib/Toast.js";

export const useAdminPagesStore = defineStore("adminPagesStore", () => {
    // const router = useRouter();
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

    const pagesActive = ref(false);
    // Getter Setter
    const getPagesActive = computed(() => pagesActive.value);
    const setPagesActive = (item) => {
        pagesActive.value = item;
    };

    const identitas = ref(false);
    // Getter Setter
    const getIdentitas = computed(() => identitas.value);
    const setIdentitas = (item) => {
        identitas.value = item;
    };

    const superadmin = ref(localStorage.getItem("superadmin_001") ? localStorage.getItem("superadmin_001") : false);
    // Getter Setter
    const getSuperadmin = computed(() => superadmin.value);
    const setSuperadmin = (item) => {
        superadmin.value = item;
    };

    const sekolah_default = { "sekolah_id": "2", "kelas_id": 10, "kelas_nama": "X" };
    const getsekolah_default = computed(() => sekolah_default)
    // State
    const pages_sekolah_aktif = ref(localStorage.getItem("pages_sekolah_aktif") ? JSON.parse(localStorage.getItem("pages_sekolah_aktif")) : null);
    const getpages_sekolah_aktif = computed(() => pages_sekolah_aktif.value)
    const setpages_sekolah_aktif = (item) => {
        pages_sekolah_aktif.value = item;
        localStorage.setItem("pages_sekolah_aktif", JSON.stringify(item))
    }


    const ujianstudi_pengaturan_default = {
        paketsoal_id: 1,
        paketsoal_nama: "-",
        tgl_ujian: moment().add(2, 'days')
    }

    const ujianstudi_pengaturan = ref(localStorage.getItem("pages_ujianstudi_pengaturan") ? JSON.parse(localStorage.getItem("pages_ujianstudi_pengaturan")) : ujianstudi_pengaturan_default)

    const get_ujianstudi_pengaturan = computed(() => ujianstudi_pengaturan.value)
    const set_ujianstudi_pengaturan = (item) => {
        ujianstudi_pengaturan.value = item;
        localStorage.setItem("pages_ujianstudi_pengaturan", JSON.stringify(item))
    }

    return {
        isSidebarActive,
        getIsSidebarActive,
        setIsSidebarActive,
        toggleSideBar,
        pagesActive,
        getPagesActive,
        setPagesActive,
        identitas,
        getIdentitas,
        setIdentitas,
        // !superadmin
        superadmin,
        getSuperadmin,
        setSuperadmin,
        // untuk sub menu sekolah
        getsekolah_default,
        pages_sekolah_aktif,
        getpages_sekolah_aktif,
        setpages_sekolah_aktif,
        // !ujianstudi
        ujianstudi_pengaturan_default,
        ujianstudi_pengaturan,
        get_ujianstudi_pengaturan,
        set_ujianstudi_pengaturan,
    };
});
