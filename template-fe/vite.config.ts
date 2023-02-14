import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/graphql': 'http://localhost:4000/graphql',
      '/ws': 'ws://localhost:4000/graphql',
    },
  },
})
