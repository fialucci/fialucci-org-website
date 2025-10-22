import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Use relative base so assets resolve under any hosting path (project subfolder, root domain, or user page)
  base: './',
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
