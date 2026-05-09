import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'SeedAvatar',
      fileName: 'seed-avatar'
    },
    rollupOptions: {
      external: []
    }
  }
})

