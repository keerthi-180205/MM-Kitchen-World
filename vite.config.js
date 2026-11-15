import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The API server defaults to :5000; override with API_URL when running a second stack.
const API_URL = process.env.API_URL || "http://localhost:5000";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: API_URL,
        changeOrigin: true,
      },
      "/uploads": {
        target: API_URL,
        changeOrigin: true,
      },
    },
  },
});
