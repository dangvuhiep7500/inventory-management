/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
  "./node_modules/flowbite-react/**/*.js",
  "./app/**/*.{js,ts,jsx,tsx}",
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
    filter: ['responsive', 'hover', 'focus', 'dark'],
  },
  plugins: [require("flowbite/plugin")],
}
