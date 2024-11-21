/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}", 
    "./index.html"
  ],
  
  theme: {
    fontFamily:{
      'sans': ['Roboto', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        "home": "url('/src/assets/bg.png')"
      }
    },
  },

  plugins: [],
}
