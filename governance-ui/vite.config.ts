import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    proxy: {
      // Forward all requests starting with /applications to the backend
      '/applications': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/tools': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  },
  appType: 'spa'
})
