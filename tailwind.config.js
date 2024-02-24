/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Path to your JS and JSX files
    "./public/index.html"         // Path to your HTML file
  ],
  theme: {
    extend: {
      colors: {
        'text-2': '#0B2636',
        'text-1': '#E5E5E5',
        'background': '#325144',
        'accent-1': '#E9BB73',
        'accent-2': '#7D8F60',
      },
      fontFamily: {
        headline: ['Montserrat', 'sans-serif'],
        text: ['Avenir', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

