import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/upload': 'http://localhost:80',
    },
  },
  resolve: {
    alias: {
      '@context': path.resolve(__dirname, './src/context'),
      '@generated': path.resolve(__dirname, './src/generated'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
})
