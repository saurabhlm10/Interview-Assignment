/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {
      'sm': '640px',    // Small screens and above
      'md': '768px',    // Medium screens and above
      'lg': '1024px',   // Large screens and above
      'xl': '1280px',   // Extra-large screens and above
      '2xl': '1536px',  // 2x Extra-large screens and above
    },
  },
  plugins: [],
}
