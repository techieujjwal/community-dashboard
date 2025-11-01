import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": "/src", // optional but useful for imports like "@/hooks/useAuth"
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
