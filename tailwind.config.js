/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f0',
          100: '#faefd9',
          200: '#f4dbb2',
          300: '#ecc382',
          400: '#e2a44f',
          500: '#d98c2e',
          600: '#c47223',
          700: '#a3581f',
          800: '#854720',
          900: '#6d3b1e',
          950: '#3b1d0e'
        },
        warm: {
          50: '#faf8f5',
          100: '#f3efe8',
          200: '#e6ddd0',
          300: '#d5c5b0',
          400: '#c2a98e',
          500: '#b39475',
          600: '#a68367',
          700: '#8b6c56',
          800: '#725949',
          900: '#5e4a3d',
          950: '#322620'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
      }
    }
  },
  plugins: []
}