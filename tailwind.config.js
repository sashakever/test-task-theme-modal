/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    './**/*.liquid', // Все файлы Liquid
    './**/*.html', // Если у вас есть HTML файлы
    './assets/**/*.js', // Ваши скрипты
  ],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    colors: {
      base: {
        100: '#FFFFFF',
        200: '#F5F5F5',
        250: '#E8E8E8',
        750: '#666666',
        800: '#464646',
        850: '#262C3E',
        900: '#010101',
      },
      blue: {
        500: '#05117F',
      },
      secondary: {
        500: '#EE2A44',
        600: '#DA0000',
      },
    },
    extend: {
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { left: '0' },
          '100%': { left: '-100%' },
        },
      },
    },
  },
  plugins: [],
}

