import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    projects: [
      // VRT は vitest.vrt.config.ts で設定
      './vitest.vrt.config.ts',
    ],
  },
});
