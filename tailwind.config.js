/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': "#2970ff",
        'black': "#000",
        'white': "#fff",
        'shadowColor':"rgba(227,227,227,0.75)"
      }
      
    },
  },
  plugins: [],
}