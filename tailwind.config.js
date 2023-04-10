/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "reddit-orange": "#fa4603",
        "reddit-gray-dark": "#dae0e6",
        "reddit-gray-light": "#f6f7f8",
        "reddit-black": "#1c1c1c",
        "reddit-white": "#ffffff",
        "reddit-blue": "#1279d3"
      }
    },
  },
  plugins: [],
}