/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#00A5D4',
        danger: '#FF0000',
      },
      borderColor: {
        primary: '#00A5D4',
        danger: '#FF0000',
      },
    },
  },
  plugins: [],
};
