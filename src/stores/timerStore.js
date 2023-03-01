import { ref, computed } from "vue";
import { defineStore } from "pinia";
import Toast from "@/components/lib/Toast.js";
import { useRouter } from "vue-router";
import { useUjianstudiPagesStore } from "@/stores/ujianstudi/ujianstudiPagesStore";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);
const ujianstudiPagesStore = useUjianstudiPagesStore();
// In Setup Stores:
// ref()s become state properties
// computed()s become getters
// function()s become actions
export const useTimerStore = defineStore("timerStore", () => {
  // const router = useRouter();
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

  const doClearInterval = () => {
    clearInterval(interval.value);
    waktu.value = 0
  }
  const doJalankanTimer = (total) => {
    clearInterval(interval.value);
    interval.value = setInterval(() => {
      if (total === 0) {
        clearInterval(interval.value);
        Toast.danger("Warning", " Waktu habis!");
        console.log("store: Waktu habis");
        // const router = useRouter();
        // router.push({
        //   name: "studi-paket",
        //   // params: { aspek_id: id }
        // });
      } else {
        total--;
        waktu.value = total;
        // console.log('store: '+ waktu.value)
      }
    }, 1000);
  };

  const doJalankanTimerV2_tgl_selesai = (tgl_selesai, aspek_detail_id, index) => {
    let dataProses = ujianstudiPagesStore.get_siswa_ujianstudi;
    if (dataProses[index].tgl_selesai == null) {
      // console.log('====================================');
      // console.log(tgl_selesai, aspek_detail_id, index);
      // console.log('====================================');
      let selesai = moment(tgl_selesai);
      let now = moment();
      let duration = moment.duration(selesai.diff(now));
      let detik = parseInt(duration.asSeconds().toFixed(0))
      let menit = parseFloat(duration.asMinutes().toFixed(2))

      // !  save tgl_mulai dan tgl_selesai kedata mapel
      dataProses[index].tgl_mulai = now;
      dataProses[index].tgl_selesai = tgl_selesai;
      ujianstudiPagesStore.set_siswa_ujianstudi(dataProses)

      // ! jaalankan timer

      let total = detik;
      doJalankanTimer(total)
      // clearInterval(interval.value);
      // interval.value = setInterval(() => {
      //   if (total === 0) {
      //     clearInterval(interval.value);
      //     Toast.danger("Warning", " Waktu habis!");
      //     console.log("store: Waktu habis");
      //     router.push({
      //       name: "studi-paket",
      //       // params: { aspek_id: id }
      //     });
      //   } else {
      //     total--;
      //     waktu.value = total;
      //     // console.log('store: '+ waktu.value)
      //   }
      // }, 1000);
    }
  };

  const doPeriksaUjianAktif = async () => {
    let dataProses = ujianstudiPagesStore.get_siswa_ujianstudi;
    for (const [index, item] of dataProses.entries()) {
      let get_sisa_waktu = null
      if (item.tgl_selesai) {
        get_sisa_waktu = await fn_get_sisa_waktu(item.tgl_selesai);
        if (get_sisa_waktu.detik > 0) {
          ujianstudiPagesStore.set_siswa_ujianstudi_aktif(item)

          // console.log('====================================');
          // console.log(get_sisa_waktu);
          // console.log('====================================');
          doJalankanTimer(get_sisa_waktu.detik)
        }
      }
    }
  }



  const fn_get_sisa_waktu = async (tgl_selesai) => {
    try {
      let result = {
        detik: 0,
        menit: 0,
        now: null,
        selesai: null
      };
      let selesai = moment(tgl_selesai);
      let now = moment();
      let duration = moment.duration(selesai.diff(now));
      result.detik = parseInt(duration.asSeconds().toFixed(0))
      result.menit = parseFloat(duration.asMinutes().toFixed(2))
      result.now = now
      result.selesai = selesai
      // result = parseInt(Date.parse(tgl_selesai)) - parseInt(Date.parse(moment().format("YYYY-MM-DD H:i:s")));
      // console.log(result);
      // const response = await Siswa.findOne({ where: { id }, include: kelas });
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }

  const defaultButtonSaveTimer = ref(3)

  const buttonSaveLoading = ref(3) //! global state disble button , if >0 button save disable 
  const get_buttonSaveLoading = computed(() => buttonSaveLoading.value)
  const intervalButtonSave = ref(0)
  const do_run_disabled_button_save = (waktu = defaultButtonSaveTimer.value) => { //! run on first load pages or after button clicked
    clearInterval(intervalButtonSave.value);
    // console.log("store: run buton disable");
    let total = waktu;
    do_jalankan_timer_save(total)
  }

  const do_jalankan_timer_save = (total) => {
    buttonSaveLoading.value = 3;
    clearInterval(intervalButtonSave.value);
    intervalButtonSave.value = setInterval(() => {
      if (total === 0) {
        clearInterval(intervalButtonSave.value);
        // Toast.danger("Warning", "Save aktif!");
        // console.log("store: Save aktif");
        // const router = useRouter();
        // router.push({
        //   name: "studi-paket",
        //   // params: { aspek_id: id }
        // });
      } else {
        total--;
        buttonSaveLoading.value = total;
        // console.log('store: ' + buttonSaveLoading.value)
      }
    }, 1000);
  };

  // const interval_reset_timer = ref(0)
  // const reset_timer_batas = ref(localStorage.getItem("reset_timer_batas") ? JSON.parse(localStorage.getItem("reset_timer_batas")) : null);
  // const get_interval_reset_timer = computed(() => interval_reset_timer.value);
  // const set_reset_timer_batas = () => {
  //   let item = moment().add(5, 'minutes');
  //   console.log('====================================');
  //   console.log(item);
  //   console.log('====================================');
  //   localStorage.setItem("reset_timer_batas", JSON.stringify(item))
  //   reset_timer_batas.value = item;
  // };
  // const do_run_reset_timer = async () => {
  //   let get_detik = await fn_get_sisa_waktu(reset_timer_batas.value)
  //   do_jalankan_timer_reset(get_detik.detik)
  // }

  // const do_jalankan_timer_reset = async (total) => {
  //   clearInterval(interval_reset_timer.value);
  //   interval_reset_timer.value = setInterval(() => {
  //     if (total === 0) {
  //       clearInterval(interval_reset_timer.value);
  //     } else {
  //       total--;
  //       interval_reset_timer.value = total;
  //       console.log('store: ' + interval_reset_timer.value)
  //     }
  //   }, 1000);
  // }
  return {
    waktu,
    getWaktu,
    fnDecrement,
    setWaktu,
    doJalankanTimer,
    doJalankanTimerV2_tgl_selesai,
    doClearInterval,
    ujianTipe,
    getUjianTipe,
    setUjianTipe,
    doPeriksaUjianAktif,
    buttonSaveLoading,
    get_buttonSaveLoading,
    do_run_disabled_button_save,
    // reset_timer_batas,
    // get_interval_reset_timer,
    // set_reset_timer_batas,
    // do_run_reset_timer, do_jalankan_timer_reset

  };
});
