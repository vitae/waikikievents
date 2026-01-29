/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Century Gothic', 'Avant Garde', 'sans-serif'],
        display: ['Century Gothic', 'Avant Garde', 'sans-serif'],
        body: ['Century Gothic', 'Avant Garde', 'sans-serif'],
      },
      colors: {
        matrix: {
          green: '#FF0000',
          dark: '#330000',
          glow: 'rgba(255, 0, 0, 0.5)',
        },
        vitae: {
          green: '#FF0000',
          black: '#000000',
          white: '#ffffff',
        },
      },
      boxShadow: {
        'neon-sm': '0 0 10px rgba(255, 0, 0, 0.5)',
        'neon-md': '0 0 20px rgba(255, 0, 0, 0.5), 0 0 40px rgba(255, 0, 0, 0.3)',
        'neon-lg': '0 0 40px #FF0000, 0 0 80px rgba(255, 0, 0, 0.5), 0 0 120px rgba(255, 0, 0, 0.25)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        'glass': '20px',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'matrix-fall': 'matrix-fall 10s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)' },
          '50%': { boxShadow: '0 0 40px #FF0000, 0 0 60px rgba(255, 0, 0, 0.5)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'matrix-fall': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
};
