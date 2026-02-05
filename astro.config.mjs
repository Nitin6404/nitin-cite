import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import { remarkMarkdownClasses } from "./src/lib/markdown-remark-plugin.mjs";
import vercel from "@astrojs/vercel";

export default defineConfig({
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
  adapter: vercel({
      webAnalytics: {
        enabled: true,
      },
  }),
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

  output: "static",

  vite: {
    plugins: [tailwindcss()],
  },
});
