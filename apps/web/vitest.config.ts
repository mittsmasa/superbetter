import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ['./vitest.setup.ts'],
    projects: [
      {
        extends: true,
        plugins: [],
        test: {
          name: 'unit',
          include: ['src/**/*.test.{ts,tsx}'],
          exclude: [
            'src/__visual-tests__/**',
            'src/**/*.integration.test.{ts,tsx}',
          ],
          sequence: {
            groupOrder: 1,
          },
        },
      },
      // VRT は vitest.vrt.config.ts で設定
      './vitest.vrt.config.ts',
      {
        extends: true,
        plugins: [],
        test: {
          name: 'integration',
          include: ['src/**/*.integration.test.{ts,tsx}'],
          exclude: ['src/__visual-tests__/**'],
          environment: 'node',
          pool: 'forks',
          isolate: false,
          maxWorkers: 1,
          testTimeout: 60000,
          hookTimeout: 60000,
          globalSetup: ['./vitest-global.setup.ts'],
          setupFiles: ['./vitest.integration.setup.ts'],
          sequence: {
            groupOrder: 2,
          },
        },
      },
    ],
  },
});
