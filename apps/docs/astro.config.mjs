import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    starlight({
      favicon: "./public/favicon.ico",
      title: "",
      logo: {
        src: "./src/assets/icon.svg",
      },
      social: {
        github: "https://github.com/jcvalino/react-geek-form",
        linkedin: "https://www.linkedin.com/in/jerico-valino-27437318a",
      },
      sidebar: [
        {
          label: "Getting Started",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Quickstart", link: "/getting-started/quickstart/" },
            { label: "Installation", link: "/getting-started/installation/" },
            {
              label: "Demo",
              link: "/getting-started/demo/",
            },
          ],
        },
        {
          label: "API's",
          items: [
            {
              label: "createInstance",
              items: [
                {
                  label: "Setup",
                  link: "/api/create-instance-setup",
                },
                {
                  label: "Implementation",
                  link: "/api/create-instance-implementation",
                },
              ],
            },
            {
              label: "createForm",
              link: "/api/create-form/",
              // badge: {
              //   text: "Deprecated",
              //   variant: "caution",
              // },
            },
            {
              label: "createGeekFormInstance",
              link: "/api/create-geek-form-instance/",
              // badge: {
              //   text: "Deprecated",
              //   variant: "caution",
              // },
            },
          ],
        },
        {
          label: "How-Tos",
          items: [
            {
              label: "Set Default Values",
              link: "/how-tos/set-default-values",
            },
            {
              label: "Update Schema",
              link: "/how-tos/update-schema",
            },
          ],
        },
        {
          label: "Integrations",
          items: [
            {
              label: "Shadcn",
              link: "/integrations/shadcn/",
            },
            {
              label: "Multiverse UI",
              link: "/integrations/multiverse/",
            },
          ],
        },
        {
          label: "Migrations",
          items: [
            {
              label: "v0 to v1",
              link: "/migrations/v0tov1/",
            },
          ],
        },
      ],
      customCss: ["./src/tailwind.css"],
    }),
    tailwind({ applyBaseStyles: false }),
    mdx(),
  ],
});
