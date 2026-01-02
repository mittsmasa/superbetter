import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineProject } from 'vitest/config';

export default defineProject({
  define: {
    'process.env': JSON.stringify({ TZ: 'UTC' }),
  },
  optimizeDeps: {
    include: ['motion/react', '@floating-ui/react'],
  },
  plugins: [tsconfigPaths(), react()],
  test: {
    name: 'vrt',
    setupFiles: ['./.storybook/vitest-browser.setup.ts'],
    css: {
      include: /.+/,
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
});
