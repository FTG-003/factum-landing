import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://factum-landing.pyragogy.org",
  output: "static",
  integrations: [],
  vite: {
    plugins: [tailwindcss()],
  },
});