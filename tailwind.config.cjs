/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '180ch', // add required value here
          }
        }
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
