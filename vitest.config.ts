import { storybookNextJsPlugin } from '@storybook/nextjs-vite/vite-plugin';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    conditions: ['react-server'],
  },
  test: {
    setupFiles: ['./vitest.setup.ts'],
    globalSetup: ['./vitest-global.setup.ts'],
    projects: [
      {
        extends: true,
        plugins: [],
        test: {
          name: 'unit',
          include: ['src/**/*.test.{ts,tsx}'],
          exclude: ['src/__visual-tests__/**'],
        },
      },
      {
        extends: true,
        plugins: [react(), storybookNextJsPlugin()],
        test: {
          name: 'vrt',
          setupFiles: ['./.storybook/vitest-browser.setup.ts'],
          css: {
            include: /.+/, // CSS を含める
          },
          include: ['src/__visual-tests__/**/*.visual.test.{ts,tsx}'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [
              {
                browser: 'chromium',
                viewport: {
                  width: 1280,
                  height: 768,
                },
              },
            ],
            screenshotFailures: process.env.CI === 'true',
            expect: {
              toMatchScreenshot: {
                comparatorName: 'pixelmatch',
                comparatorOptions: {
                  threshold: 0.1,
                },
              },
            },
          },
        },
      },
      {
        extends: true,
        plugins: [],
        test: {
          name: 'integration',
          include: ['src/**/*.integration.test.{ts,tsx}'],
          exclude: ['src/__visual-tests__/**'],
          environment: 'node',
          pool: 'forks',
          // @ts-expect-error - poolOptions型定義がVitest 4.xで未対応
          poolOptions: {
            forks: {
              singleFork: true, // DB競合を防ぐため順次実行
            },
          },
          testTimeout: 30000,
          hookTimeout: 30000,
          setupFiles: ['./vitest.integration.setup.ts'],
        },
      },
    ],
  },
});
