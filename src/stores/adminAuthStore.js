import { ref, computed } from "vue";
import { defineStore } from "pinia";
// import { useRouter } from "vue-router";
// import Toast from "@/components/lib/Toast.js";

export const useAdminAuthStore = defineStore("adminAuthStore", () => {
    // const router = useRouter();
    // State
    const token = ref(localStorage.getItem("token") ? localStorage.getItem("token") : "");
    // Getter Setter
    const getToken = computed(() => token.value);
    const setToken = (item) => {
        token.value = item;
    };

    const isLogin = ref(localStorage.getItem("isLogin")
        ? localStorage.getItem("isLogin")
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
