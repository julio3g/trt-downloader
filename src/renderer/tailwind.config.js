/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.tsx']
export const theme = {
  extend: {
    keyframes: {
      heart: {
        '0%, 40%, 80%, 100%': { transform: 'scale(.75)' },
        '20%, 60%': { transform: 'scale(1)' },
      },
    },
    animation: {
      heart: 'heart 1s infinite',
    },
    fontFamily: {
      sans: 'Inter, sans-serif',
    },
  },
}
export const plugins = []
