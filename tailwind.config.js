/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./slices/**/*.{js,ts,jsx,tsx,mdx}",  
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee2 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
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
      red: '#F21C1C',
      blu: '#1759FF',
      azure: '#31D8FF',
      white: '#ffff',
      black: 'black',
      transparent: "transparent"
    },
    screens: {
      'sm': '568px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    fontFamily: {
      sans: "Helvetica",
      primary: "Helvetica",
      medium: "Helvetica-md",
      italic: "Helvetica-it",
      serif: "Times"
    },
    fontSize: {
      'xs': '.14px', 
      'sm': '16px', 
      'base': '20px',
      'md': '25px',
      'md1': '30px', 
      'md2': "35px",
      'md3': '40px',
      'lg': '50px',
      'xl': '55px',    
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
