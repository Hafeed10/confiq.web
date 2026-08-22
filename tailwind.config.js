/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0D382C',
          emerald: '#16423C',
          medium: '#2D5F52',
          light: '#E8EFE6',
          pale: '#F4F7F2',
          bg: '#FAFBF8',
          cardBg: '#FFFFFF',
          textDark: '#1A2E26',
          gold: '#C5A059',
          goldLight: '#F3E5C8',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
        serif: ['"Cinzel"', 'serif'],
      },
      boxShadow: {
        'card': '0 10px 30px -5px rgba(13, 56, 44, 0.08)',
        'card-hover': '0 20px 40px -5px rgba(13, 56, 44, 0.15)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
