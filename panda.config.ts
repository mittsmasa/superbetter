import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  strictTokens: true,
  strictPropertyValues: true,
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  theme: {
    extend: {},
  },
  outdir: 'src/styled-system',
});
