module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '120': '30rem',
      },
      maxWidth: {
        '3/4': '75%',
      },
      height: {
        '1/10': '10%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
