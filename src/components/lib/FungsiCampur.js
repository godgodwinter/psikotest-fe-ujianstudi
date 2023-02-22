const romanize = (num) => {
  if (isNaN(num)) return NaN;
  let digits = String(+num).split(""),
    key = [
      "",
      "C",
      "CC",
      "CCC",
      "CD",
      "D",
      "DC",
      "DCC",
      "DCCC",
      "CM",
      "",
      "X",
      "XX",
      "XXX",
      "XL",
      "L",
      "LX",
      "LXX",
      "LXXX",
      "XC",
      "",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
    ],
    roman = "",
    i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
};

const fnNumberToAlphabet = (num) => {
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
// (value + 9).toString(36).toUpperCase()

const formatRupiah = (angka = 0, prefix = "Rp. ") => {
  let number_string = angka.toString().replace(/[^,\d]/g, ""),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    let separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
};

const numberPattern = /\d+/g;
const Fungsi = {
  romanize,
  fnNumberToAlphabet,
  formatRupiah,
  numberPattern,
};
export default Fungsi;
