module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      'quick': ['Quicksand', 'sans - serif'],
      'bungee': ['Bungee Shade', 'monospace']
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
