/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'poker-black': '#0a0a0a',
        'poker-gold': '#FFD700',
        'poker-red': '#DC143C',
        'poker-green': '#00A86B',
        'whatsapp': '#25D366',
      }
    },
  },
  plugins: [],
}