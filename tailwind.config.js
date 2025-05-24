/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0055FF',
          light: '#E8F1FF',
          dark: '#003EB3',
        },
        accent: {
          DEFAULT: '#00B96B',
          light: '#E6FAF0',
          dark: '#008C4A',
        },
        background: {
          DEFAULT: '#F7F8FA',
          paper: '#FFFFFF',
        },
        border: {
          DEFAULT: '#E5E6EB',
          selected: '#0055FF',
        },
        text: {
          primary: '#1D2129',
          secondary: '#4E5969',
          light: '#86909C',
          link: '#0055FF',
        },
      },
      borderRadius: {
        DEFAULT: '0.75rem',
        button: '1.5rem',
      },
      fontFamily: {
        main: ['Inter', 'LarkSans', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
