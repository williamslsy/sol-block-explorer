import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#0F0F0F',
        green_mantis: '#52F2B9',
        white_primary: '#FFFFFF',
        white_secondary: 'rgba(255, 255, 255, 0.6)',
        link: '#52F2B9',
        titanium: 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
