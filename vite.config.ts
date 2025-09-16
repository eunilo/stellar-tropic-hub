import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5174,
    strictPort: true,
    hmr: { 
      overlay: false,
      port: 5174
    },
    // Adicione a URL do ngrok à lista de allowedHosts
    // Substitua 'cc77efc01466.ngrok-free.app' pela sua URL atual do ngrok
    allowedHosts: ['cc77efc01466.ngrok-free.app'],
  },
  // Desabilitado para evitar interferências em runtime durante o dev
  plugins: [react() /*, mode === "development" && componentTagger()*/].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@tanstack/react-query",
      "lightweight-charts",
      "react-resize-detector",
    ],
  },
}));
