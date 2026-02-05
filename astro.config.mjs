import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import { remarkMarkdownClasses } from "./src/lib/markdown-remark-plugin.mjs";


export default defineConfig({
  site: "https://nitin-cite.vercel.app",
  experimental: {
    fonts: [
      {
        name: "JetBrains Mono",
        cssVariable: "--font-jetbrains-mono",
        provider: fontProviders.fontshare(),
        fallbacks: ["monospace"],
      },
    ],
  },
  output: "static",
  image: {
    domains: ["utfs.io"],
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
  },

  integrations: [react()],

  markdown: {
    syntaxHighlight: "shiki",
    gfm: true,
    remarkPlugins: [remarkMarkdownClasses],
  },



  vite: {
    plugins: [tailwindcss()],
  },
});
