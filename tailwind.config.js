/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'custom-bg': 'url("../public/large2x.png")',
      },
      color:{
        custom:{
          'nameuser': '#2D1937',
          'botontabblack': '#4B4B52',
          'botontaborange': '#ED8936',
        }
      }
    },
  },
  plugins: [],
}
