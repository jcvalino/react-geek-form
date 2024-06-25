import colors from 'tailwindcss/colors';
import starlightPlugin from '@astrojs/starlight-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Your preferred accent color. Indigo is closest to Starlight’s defaults.
        accent: colors.emerald,
        // Your preferred gray scale. Zinc is closest to Starlight’s defaults.
        gray: colors.neutral,
      },
    },
  },
  plugins: [starlightPlugin()],
};
