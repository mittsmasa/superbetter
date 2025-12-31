import { fileURLToPath } from 'node:url';
import { storybookNextJsPlugin } from '@storybook/nextjs-vite/vite-plugin';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineProject } from 'vitest/config';

export default defineProject({
  define: {
    __dirname: JSON.stringify(fileURLToPath(new URL('.', import.meta.url))),
  },
  resolve: {
    alias: {
      // サーバーサイドモジュールをスタブに置換
      'server-only': fileURLToPath(
        new URL('./.storybook/stubs/server-only.ts', import.meta.url),
      ),
    },
  },
  optimizeDeps: {
    include: [
      'motion/react',
      'next/navigation',
      '@floating-ui/react',
      'recharts',
      '@date-fns/tz',
      'date-fns/endOfDay',
      'date-fns/startOfDay',
    ],
  },
  plugins: [tsconfigPaths(), react(), storybookNextJsPlugin()],
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
});
