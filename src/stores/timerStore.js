import { ref, computed } from "vue";
import { defineStore } from "pinia";
import Toast from "@/components/lib/Toast.js";
import { useRouter } from "vue-router";
// In Setup Stores:
// ref()s become state properties
// computed()s become getters
// function()s become actions
export const useTimerStore = defineStore("timerStore", () => {
  const router = useRouter();
  // State
  const waktu = ref(0);
  // Getter Setter
  const getWaktu = computed(() => waktu.value);
  const setWaktu = (n) => {
    waktu.value = n;
  };

  const ujianTipe = ref(null);
  const getUjianTipe = computed(() => ujianTipe.value);
  const setUjianTipe = (n) => {
    ujianTipe.value = n;
  };

  // Fn
  function fnDecrement() {
    waktu.value--;
  }

  // Jalanakan Timer dengan base state interval agar tidak duplikat interval
  const interval = ref(null);
  const doJalankanTimer = (total) => {
    clearInterval(interval.value);
    interval.value = setInterval(() => {
      if (total === 0) {
        clearInterval(interval.value);
        Toast.danger("Warning", " Waktu habis!");
        console.log("store: Waktu habis");
        router.push({
          name: "ujian.psikotest.paket",
          // params: { aspek_id: id }
        });
      } else {
        total--;
        waktu.value = total;
        // console.log('store: '+ waktu.value)
      }
    }, 1000);
  };

  return {
    waktu,
    getWaktu,
    fnDecrement,
    setWaktu,
    doJalankanTimer,
    ujianTipe,
    getUjianTipe,
    setUjianTipe,
  };
});
