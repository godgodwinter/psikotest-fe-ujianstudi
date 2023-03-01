import Api from "@/axios/axios";
import ApiNode from "@/axios/axiosNode";
// import jwt_decode from "jwt-decode";
import Toast from "@/components/lib/Toast.js";
import { useSiswaAuthStore } from "@/stores/siswaAuthStore";
import { useUjianstudiPagesStore } from "@/stores/ujianstudi/ujianstudiPagesStore";
import { useTimerStore } from "@/stores/timerStore";
const siswaAuthStore = useSiswaAuthStore();
const ujianstudiPagesStore = useUjianstudiPagesStore();
const timerStore = useTimerStore();

const doLogin = async (username, password) => {
    try {
        const response = await Api.post("siswa/auth/login", {
            email: username,
            password: password,
        });
        // console.log(response);
        if (response.code === 200) {
            const { token } = response;
            localStorage.setItem("siswa_token", token);
            localStorage.setItem("siswa_isLogin", true);
            console.log("Login berhasil");
            siswaAuthStore.setToken(token);
            siswaAuthStore.setIsLogin(true);
            // let decoded = jwt_decode(token);
            //   storeAuth.commit("setDataAuth", decoded);
            // console.log(decoded);
            await getProfile();
            await getAspekDetail();
            // await timerStore.set_reset_timer_batas();
            // await timerStore.do_run_reset_timer()
            Toast.success("Success", "Login Berhasil!");
        } else {
            Toast.danger("Warning", "Login gagal!");
        }
        return true;
    } catch (error) {
        console.error(error);
        Toast.danger("Warning", "Login gagal!");
    }
};

const getProfile = async () => {
    try {
        const response = await ApiNode.get("siswa/profile",);
        ujianstudiPagesStore.set_siswa_profile(response.data)
    } catch (error) {
        console.error(error);
        // Toast.danger("Warning", "Login gagal!");
    }
};

const getAspekDetail = async () => {
    try {
        const response = await ApiNode.get("siswa/ujianstudi/aspek_detail",);
        ujianstudiPagesStore.set_siswa_ujianstudi(response.data || [])
    } catch (error) {
        console.error(error);
        // Toast.danger("Warning", "Login gagal!");
    }
};

const doCheckToken = async (token) => {
    try {
        const response = await Api.post(`siswa/auth/me`, {
            token: token,
        });
        // console.log(response.hasOwnProperty("data"));
        // eslint-disable-next-line no-prototype-builtins
        if (response.hasOwnProperty("data")) {
            const newToken = response.data.newToken;
            localStorage.setItem("siswa_token", newToken);
            //   storeAdminAuth.setToken(newToken);
            // console.log(response.data.me.nama);

            //   const dataMe = {
            //     id: response.data.me.id,
            //     nama: response.data.me.nama,
            //     username: response.data.me.username,
            //     email: response.data.me.email,
            //   };
            //   storeAdminAuth.setMe(dataMe);
            // console.log(dataMe);

            return true;
        } else {
            return false;
        }
    } catch (error) {
        Toast.danger("Error", `Gagal menghubungkan ke Server!`);
        console.error(error);
        return false;
    }
};

const doLogout = async (alert = true) => {
    try {
        localStorage.removeItem("siswa_token");
        localStorage.removeItem("siswa_isLogin");
        localStorage.removeItem("siswa_profile");
        localStorage.removeItem("siswa_isLogin");
        timerStore.doClearInterval()

        ujianstudiPagesStore.set_siswa_ujianstudi([])
        ujianstudiPagesStore.set_siswa_ujianstudi([])
        ujianstudiPagesStore.set_siswa_profile(null)
        // storeAdminAuth.setToken("");
        // storeAdminAuth.setIsLogin(false);
        if (alert) {
            Toast.success("Info", "Logout berhasil!");
        }
        return true;
    } catch (error) {
        console.error(error);
    }
};

const API = {
    doLogin,
    getAspekDetail,
    doCheckToken,
    doLogout,
};
export default API;
