import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: '<ReactGeekForm />',
      logo: {
        src: './src/assets/icon.svg',
      },
      social: {
        github: 'https://github.com/jcvalino/react-geek-form',
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Installation', link: '/getting-started/installation/' },
            { label: 'Quickstart', link: '/getting-started/quick-start/' },
          ],
        },
        {
          label: "API's",
          items: [
            {
              label: 'createForm',
              link: '/api/create-form/',
            },
            {
              label: 'createGeekFormInstance',
              link: '/api/create-geek-form-instance/',
            },
          ],
        },
      ],
      customCss: ['./src/tailwind.css'],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
