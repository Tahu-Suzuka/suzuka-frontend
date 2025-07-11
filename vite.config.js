import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["logo.png"],
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Tahu Suzuka",
        short_name: "Suzuka",
        description: "Aplikasi Pemesanan Tahu Tradisional",
        theme_color: "#d32f2f",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/images/logo/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/logo/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
