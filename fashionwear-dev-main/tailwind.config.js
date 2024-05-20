/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layout/*.liquid",
    "./sections/*.liquid",
    "./snippets/*.liquid",
    "./assets/*.{js,css}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#403B3A',
        'regular': '#929292',
        'tertiary': '#686868',
        'button_color': '#E20000',
        'white': '#ffffff',
        'secondary': '#e4e1df',
        'tag_color': '#5A9DE5',
      }
    },
    screens: {
      'xxs': '320px',
      // => @media (min-width: 640px) { ... }
      'xs': '425px',

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    container:{
      screens:{
        DEFAULT: '100%',
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1240px',
        '2xl': '1496px'
      }
    }
  },
  plugins: [],
}
