module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '120': '30rem',
        '1/10': '10%',
        '9/10': '90%',
      },
      maxWidth: {
        '3/4': '75%',
      },
      height: {
        '1/10': '10%',
      },
      margin: {
        '2%': '2%',
      },
      borderRadius: {
        '40%': '40%',
        '50%': '50%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
