
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);

export const defaultPendingLogin = 5000;
export const defaultPendingSave = 3000;

export const fn_get_sisa_waktu = (tgl_selesai) => {
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


export const fnNumberToAlphabet = (num) => {
    if (isNaN(num)) return NaN;
    //   let digits = String(+num).split(""),
    //     key = [
    //       "",
    //       "A",
    //       "B",
    //       "C",
    //       "D",
    //       "E",
    //       "F",
    //       "G",
    //       "H",
    //       "I",
    //       "J",
    //       "K",
    //       "L",
    //       "M",
    //       "N",
    //       "O",
    //       "P",
    //       "Q",
    //       "R",
    //       "S",
    //       "T",
    //       "U",
    //       "V",
    //       "W",
    //       "X",
    //       "Y",
    //       "Z",
    //     ],
    //     alphabet = "",
    //     i = 3;
    //   while (i--) alphabet = (key[+digits.pop() + i * 10] || "") + alphabet;
    //   return Array(+digits.join("") + 1).join("") + alphabet;
    return (num + 9).toString(36).toUpperCase();
};


export const do_jalankan_timer_reset = async (counter = 0) => {
    if (counter < durasi_tunggu.value) {
        setTimeout(function () {
            interval_reset_timer.value--;
            counter++;
            // console.log(counter);
            do_jalankan_timer_reset(counter);
        }, 1000);
    }
    // setTimeout(do_aktivkan_reset, total, false);
}
// do_jalankan_timer_reset(0); //cara memanggil timer


// export const fnDoPending = async (status = false, timer = 3000) => {
//     return setTimeout(fnPending, timer, status);

// }
// const fnPending = async (status) => {
//     return status
// }