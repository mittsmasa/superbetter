import { storybookNextJsPlugin } from '@storybook/nextjs-vite/vite-plugin';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ['./vitest.setup.ts'],
    projects: [
      {
        extends: true,
        plugins: [react()],
        test: {
          name: 'browser',
          include: ['src/**/*.test.{ts,tsx}'],
          browser: {
            provider: playwright({
              contextOptions: {
                timezoneId: 'JST',
              },
            }),
            enabled: true,
            headless: true,
            screenshotFailures: false,
            instances: [{ browser: 'chromium' }],
          },
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
            screenshotFailures: false,
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
    ],
  },
});
