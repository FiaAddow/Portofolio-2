const { theme } = require('@sanity/demo/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './intro-template/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    ...theme,
    // Overriding fontFamily to use @next/font loaded families
    fontFamily: {
      mono: 'var(--font-mono)',
      sans: 'var(--font-sans)',
      serif: 'var(--font-serif)',
    },
    extend: {
      colors: {
        "portfolio-1": '#EDB43C',
        "portfolio-2": '#F26441',
        "portfolio-3": '#29706D',
        "portfolio-4": '#B3DFD3',
        "portfolio-5": '#F8F7F1'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
}
