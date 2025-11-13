// This file has been automatically migrated to valid ESM format by Storybook.

import type { StorybookConfig } from '@storybook/nextjs-vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: [
    '../src/public',
    { from: '../src/public/fonts', to: '/src/public/fonts' },
  ],
  async viteFinal(config) {
    if (!config.plugins) {
      config.plugins = [];
    }
    config.plugins.push(
      svgr({
        svgrOptions: {
          exportType: 'default',
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: '**/*.svg',
      }),
    );
    return config;
  },
};
export default config;
