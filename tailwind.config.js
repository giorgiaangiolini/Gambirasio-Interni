/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/slices/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        '0': '0px',
        '1': '10px',
        '2': '20px',
        '3': '30px',
        '4': '40px',
        '5': '50px',
        '6': '60px',
        '7': '70px',
        '8': '80px',
        '9': '90px',
        '10': '100px',
        '11': '110px',
        '12': '120px',
        '13': '130px',
        '14': '140px',
      },
     
    },
    colors: {
      // grey: '#8993A0',
      grey: '#353535',
      black: 'black',
      white: '#FFFEF7',
      transparent: "transparent",
      blue: '#020728',
    },
    screens: {
      'sm': '568px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    fontFamily: {
      primary: "Helvetica",
      secondary: "var(--charlotte-font)"
    },
    fontSize: {
      'base': '16px',  
      'm': '18px',
      'sm': '14px',
      'xs': '12px',
    },
    fontWeights: {
      'thin': 200,
      'light': 300,
      'book': 400,
      'medium': 500,
      'semibold': 600,
      'bold': 700,
      'extrabold': 800,
      'black': 900,
    },
    leading: {
      'none': 1,
      'tight': 1.20,
      'snug': 1.375,
      'normal': 1.5,
      'relaxed': 1.625,
      'loose': 2,
    },
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
    },
    borderWidths: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '4': '4px',
      '8': '8px',
    },
    corePlugins: {
      aspectRatio: false,
    },
  },
  plugins: [
    // require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
