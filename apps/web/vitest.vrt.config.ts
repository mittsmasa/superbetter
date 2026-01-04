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
      mysql2: fileURLToPath(
        new URL('./.storybook/stubs/mysql2.ts', import.meta.url),
      ),
      'mysql2/promise': fileURLToPath(
        new URL('./.storybook/stubs/mysql2.ts', import.meta.url),
      ),
      'drizzle-orm': fileURLToPath(
        new URL('./.storybook/stubs/drizzle-orm.ts', import.meta.url),
      ),
      'drizzle-orm/mysql-core': fileURLToPath(
        new URL(
          './.storybook/stubs/drizzle-orm-mysql-core.ts',
          import.meta.url,
        ),
      ),
      'drizzle-orm/mysql2': fileURLToPath(
        new URL('./.storybook/stubs/drizzle-orm.ts', import.meta.url),
      ),
      '@/db': fileURLToPath(
        new URL('./.storybook/stubs/db.ts', import.meta.url),
      ),
      '@/db/client': fileURLToPath(
        new URL('./.storybook/stubs/db.ts', import.meta.url),
      ),
      '@/db/schema/auth': fileURLToPath(
        new URL('./.storybook/stubs/db.ts', import.meta.url),
      ),
      '@/db/schema/superbetter': fileURLToPath(
        new URL('./.storybook/stubs/db.ts', import.meta.url),
      ),
      '@/lib/auth': fileURLToPath(
        new URL('./.storybook/stubs/better-auth.ts', import.meta.url),
      ),
      'better-auth': fileURLToPath(
        new URL('./.storybook/stubs/better-auth.ts', import.meta.url),
      ),
      'better-auth/adapters/drizzle': fileURLToPath(
        new URL('./.storybook/stubs/better-auth.ts', import.meta.url),
      ),
      'better-auth/api': fileURLToPath(
        new URL('./.storybook/stubs/better-auth.ts', import.meta.url),
      ),
      'better-auth/next-js': fileURLToPath(
        new URL('./.storybook/stubs/better-auth.ts', import.meta.url),
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
    // VRTテストファイルのみをスキャン対象とする
    entries: ['src/__visual-tests__/**/*.visual.test.{ts,tsx}'],
    // サーバーサイド依存を除外
    exclude: ['drizzle-orm', 'mysql2', 'better-auth', '@next/env'],
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
