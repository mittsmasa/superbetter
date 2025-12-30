// This file has been automatically migrated to valid ESM format by Storybook.

import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-mcp'],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: [
    '../src/public',
    { from: '../src/public/fonts', to: '/src/public/fonts' },
  ],
  core: {
    disableTelemetry: true, // テレメトリーを無効化して起動を高速化
  },
  typescript: {
    check: false, // 型チェックを無効化（別途 type-check コマンドで実行）
    reactDocgen: 'react-docgen-typescript', // より高速なドキュメント生成
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      compilerOptions: {
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
      },
      propFilter: () => true,
    },
  },
  async viteFinal(config) {
    return {
      ...config,
      optimizeDeps: {
        ...config.optimizeDeps,
        include: [
          ...(config.optimizeDeps?.include || []),
          '@storybook/nextjs-vite',
          'react',
          'react-dom',
        ],
      },
      build: {
        ...config.build,
        sourcemap: false, // ソースマップを無効化して高速化
      },
      server: {
        ...config.server,
        fs: {
          ...config.server?.fs,
          strict: false,
        },
      },
    };
  },
};
export default config;
