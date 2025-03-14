import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  homepage: "https://adrioui.github.io/portfolio/",
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  base: "/", // Changed from "./" to "/" for Vercel deployment
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
