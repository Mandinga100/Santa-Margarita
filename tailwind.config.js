/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        "background-light": "#ffffff",
        "background-dark": "#191919",
        "soft-gray": "#F2F2F2",
        "medium-gray": "#7E7D7D",
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [
    /* eslint-disable @typescript-eslint/no-require-imports */
    require('tailwind-scrollbar'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    /* eslint-enable @typescript-eslint/no-require-imports */
  ],
}
