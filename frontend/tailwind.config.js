/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#cbd9fc',
          300: '#9cb5f9',
          400: '#648af5',
          500: '#3b66f1',
          600: '#254ce4',
          700: '#1d3bc0',
          800: '#1c339a',
          900: '#1c2e7a',
          950: '#111b4a',
        },
      },
    },
  },
  plugins: [],
};
