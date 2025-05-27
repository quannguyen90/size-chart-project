import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  base: '/size-chart-project/',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: "esnext",
    rollupOptions: {
      input: {
        main: 'index.html',
        embed: 'src/embed/index.tsx'
      }
    }
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  optimizeDeps: {
    extensions: ["jsx", "tsx", "ts", "js"],
    include: [],
    exclude: ['@solidjs/router'],
  },
});
