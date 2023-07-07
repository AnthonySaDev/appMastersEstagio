/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
    },
    fontFamily: {
      sans: ['Fira Sans', 'sans-serif'],
      ttoctosquares: ['Ttoctosquares', 'sans-serif'],
    },
  },
  screens: {
    'xl': '1350px', 
  },
  plugins: [
    require('@tailwindcss/typography'), 
  ],
}
