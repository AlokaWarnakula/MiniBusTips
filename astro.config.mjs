import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server",
  adapter: cloudflare({ platformProxy: { enabled: true } }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // React's edge renderer avoids Node-only MessageChannel usage in Workers.
      alias: { "react-dom/server": "react-dom/server.edge" },
    },
  },
});
