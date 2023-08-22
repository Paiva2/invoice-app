/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      md: { max: "48rem" },
      sm: { max: "42.5rem" },
      lg: { max: "65rem" },
    },
    extend: {
      fontFamily: {
        spartan: "var(--font-spartan)",
      },
      colors: {
        "strong-blue": "#252945",
        "dark-blue": "#1e2139",
        "light-purple": "#7c5dfa",
        "dark-purple": "#141625",
        "hover-purple": "#9277ff",
        "hash-blue": "#7e88c3",
        "spacial-dark": "#0c0e16",
        "pure-white": "#fff",
        "strong-emerald": "#33d69f",
        "strong-orange": "#ff8f00",
        "light-red": "#ec5757",
        "fade-red": "#ff9797",
        "transparent-orange": "rgba(255,143,0,.0571)",
        "transparent-emerald": "rgba(51,214,159,.0571)",
        "transparent-white": "rgba(223,227,250,.0571)",
        "light-bg": "#f8f8fb",
      },
      keyframes: {
        openMenuAnimation: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(0%)" },
        },
        spinAnimation: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "open-edit": "openMenuAnimation .3s linear forwards",
        "loading-circle": "spinAnimation 1s linear infinite",
      },
    },
  },
  plugins: [],
}
