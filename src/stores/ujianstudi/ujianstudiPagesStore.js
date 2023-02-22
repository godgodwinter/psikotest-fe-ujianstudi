import { ref, computed } from "vue";
import { defineStore } from "pinia";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);
// import { useRouter } from "vue-router";
// import Toast from "@/components/lib/Toast.js";

export const useUjianstudiPagesStore = defineStore("ujianstudiPagesStore", () => {
    // const router = useRouter();
    // State
    const siswa_profile = ref(localStorage.getItem("siswa_profile") ? JSON.parse(localStorage.getItem("siswa_profile")) : null);
    // Getter Setter
    const get_siswa_profile = computed(() => siswa_profile.value);
    const set_siswa_profile = (item) => {
        localStorage.setItem("siswa_profile", JSON.stringify(item))
        siswa_profile.value = item;
    };
    const siswa_ujianstudi = ref(localStorage.getItem("siswa_ujianstudi") ? JSON.parse(localStorage.getItem("siswa_ujianstudi")) : null);
    // Getter Setter
    const get_siswa_ujianstudi = computed(() => siswa_ujianstudi.value);
    const set_siswa_ujianstudi = (item) => {
        localStorage.setItem("siswa_ujianstudi", JSON.stringify(item))
        siswa_ujianstudi.value = item;
    };

    return {
        siswa_profile,
        get_siswa_profile,
        set_siswa_profile,
        siswa_ujianstudi,
        get_siswa_ujianstudi,
        set_siswa_ujianstudi,
    };
});
