/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#2970ff",
        'black': "#000",
        'white': "#fff",
      },
      boxShadow: {
        'custom': "0px 0px 30px 8px rgba(227,227,227,0.75)", // Define your custom shadow here
      },
    },
  },
  plugins: [],
}
