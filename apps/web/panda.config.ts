import { defineConfig } from '@pandacss/dev';
import { uiPreset } from '@superbetter/ui/preset';

export default defineConfig({
  presets: [uiPreset],
  strictTokens: true,
  strictPropertyValues: true,
  preflight: true,
  include: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@superbetter/ui/src/**/*.{js,jsx,ts,tsx}',
  ],
  exclude: [],
  globalCss: {
    body: {
      backgroundColor: 'background',
      color: 'foreground',
    },
    '*': {
      boxSizing: 'border-box',
    },
  },
  outdir: 'src/styled-system',
});
