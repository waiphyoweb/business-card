/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppinsLight: "PoppinsLight",
        poppinsRegular: "PoppinsRegular",
        poppinsMedium: "PoppinsMedium",
        poppinsSemiBold: "PoppinsSemiBold",
        poppinsBold: "PoppinsBold",
      } ,     
      boxShadow: {
        '5xl': '20px 10px 50px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

