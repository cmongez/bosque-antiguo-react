import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    proxy: {
      "/api/v1/products": {
        target: "http://100.31.23.11:8080", // Microservicio productos
        changeOrigin: true,
      },
      "/api/v1/categories": {
        target: "http://localhost:8080", // Microservicio productos  
        changeOrigin: true,
      },
      "/api/v1/sales": {
        target: "http://100.31.23.11:8081", // Microservicio ventas
        changeOrigin: true,
      },
      "/api/v1/auth": {
        target: "http://100.31.23.11:8082", // Microservicio usuario
        changeOrigin: true,
      },
      "/api/v1/reports": {
        target: "http://localhost:8083", // Microservicio reportes
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
})


