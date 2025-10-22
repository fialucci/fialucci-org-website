import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/fialucci-org-website/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'esnext'
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    include: ['src/**/*.test.{ts,tsx}']
  }
});
