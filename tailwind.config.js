/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        spartan: ["var(--font-spartan)"],
      },
      colors: {
        "strong-blue": "#252945",
        "light-purple": "#7c5dfa",
        "hover-purple": "#9277ff",
        "pure-white": "#fff",
        "strong-emerald": "#33d69f",
        "strong-orange": "#ff8f00",
        "transparent-orange": "rgba(255,143,0,.0571)",
        "transparent-emerald": "rgba(51,214,159,.0571)",
        "transparent-white": "rgba(223,227,250,.0571)",
      },
    },
  },
  plugins: [],
}
