import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  css: {
    modules: true,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001", // URL del backend
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "./src/assets/logos/logoClaro.png",
      },
    },
  },
});
