/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/tdd-react-template/',  // Adjust base path for GitHub Pages 
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    include: [ 'src/**/*.test.{ts,tsx}' ],
    coverage: {
      provider: 'istanbul',
      include: [ 'src/**/*.{ts,tsx}' ],
      exclude: [ 'src/main.tsx' ],
    },
  },
})
