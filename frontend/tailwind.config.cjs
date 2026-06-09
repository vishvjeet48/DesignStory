/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF8F4',
        primary: '#F8F5F0',
        sand: '#E8DED1',
        olive: '#79806B',
        'olive-muted': '#7A806C',
        charcoal: '#2C2C2C',
        brown: '#A58462',
        'brown-light': '#C6A77B',
        surface: '#1B1B1B',
        night: '#0a0a0a',
        mist: '#F5F5F5',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'ui-sans-serif', 'system-ui'],
        display: ['Playfair Display', 'ui-serif', 'serif'],
        serif: ['Cormorant Garamond', 'ui-serif', 'serif'],
      },
      boxShadow: {
        luxury: '0 25px 50px -12px rgba(44, 44, 44, 0.08)',
        'luxury-lg': '0 35px 60px -15px rgba(44, 44, 44, 0.12)',
        glass: '0 8px 32px rgba(44, 44, 44, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
        'wa-breathe': 'wa-breathe 3s ease-in-out infinite',
      'wa-ping':    'wa-ping 3s ease-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
        'wa-breathe': {
        '0%, 100%': { boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.42), 0 8px 32px rgba(37,211,102,0.28), 0 2px 8px rgba(0,0,0,0.28)' },
        '50%':       { boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.42), 0 8px 40px rgba(37,211,102,0.50), 0 2px 12px rgba(0,0,0,0.32)' },
      },
      'wa-ping': {
        '0%':   { transform: 'scale(1)', opacity: '0.6' },
        '100%': { transform: 'scale(1.9)', opacity: '0' },
      },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
