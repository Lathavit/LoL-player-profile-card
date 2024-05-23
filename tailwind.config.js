/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mitr': ['Mitr', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

