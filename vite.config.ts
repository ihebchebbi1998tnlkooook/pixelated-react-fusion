
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      '90a11b9b-8283-4eb9-9947-2a0cf24bc49d.lovableproject.com',
      'ee6a09be-7286-40b2-a92e-84ae4933d384.lovableproject.com',
      '8f409aa3-0d6f-47e8-a926-41f58a85cd1a.lovableproject.com',
      'd573e3a8-5236-4893-98c2-5c1473c5d143.lovableproject.com',
      'localhost'
    ]
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          ui: ['@radix-ui/react-navigation-menu', '@radix-ui/react-dialog']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: false,
    cssCodeSplit: true,
  }
}));
