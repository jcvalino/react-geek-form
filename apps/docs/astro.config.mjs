import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      favicon: "./src/assets/favicon.ico",
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
          label: "Integrations",
          items: [
            {
              label: "Shadcn",
              link: "/integrations/shadcn/",
            },
            {
              label: "Multiverse UI",
              link: "/integrations/msys-ui/",
            },
          ],
        },
        {
          label: "Migrations",
          items: [
            {
              label: "v0 to v1",
              link: "/migragtions/v0tov1/",
            },
          ],
        },
      ],
      customCss: ["./src/tailwind.css"],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
