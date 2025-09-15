import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ['./vitest.setup.ts'],
    testTimeout: 60000, // testcontainers用に長めのタイムアウトを設定
    hookTimeout: 60000,
    alias: {
      'server-only': new URL('./vitest.mocks.ts', import.meta.url).pathname,
    },
    globals: true,
  },
});
