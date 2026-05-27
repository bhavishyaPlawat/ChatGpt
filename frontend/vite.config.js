import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to the backend to avoid CORS in development
      "/api": {
        target: "https://chatgpt-backend-8psi.onrender.com",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
