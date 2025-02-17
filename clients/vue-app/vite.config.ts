import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Load environment variables from a .env file or define them in the Vite config
const apiUrl = process.env.VITE_API_URL || "http://localhost:8080"; // Fallback to a default API URL

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 8081,
    proxy: {
      "/api": apiUrl,
    },
  },
});
