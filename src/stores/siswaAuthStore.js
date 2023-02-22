import { ref, computed } from "vue";
import { defineStore } from "pinia";
// import { useRouter } from "vue-router";
// import Toast from "@/components/lib/Toast.js";

export const useSiswaAuthStore = defineStore("siswaAuthStore", () => {
    // const router = useRouter();
    // State
    const token = ref(localStorage.getItem("siswa_token") ? localStorage.getItem("siswa_token") : "");
    // Getter Setter
    const getToken = computed(() => token.value);
    const setToken = (item) => {
        token.value = item;
    };

    const isLogin = ref(localStorage.getItem("siswa_isLogin")
        ? localStorage.getItem("siswa_isLogin")
        : false);
    const getIsLogin = computed(() => isLogin.value);
    const setIsLogin = (item) => {
        isLogin.value = item;
    };


    return {
        token,
        getToken,
        setToken,
        isLogin,
        getIsLogin,
        setIsLogin,
    };
});
