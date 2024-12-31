import { textStyles } from '@/styles/textStyles';
import { tokens } from '@/styles/tokens';
import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  strictTokens: true,
  strictPropertyValues: true,
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  globalCss: {
    body: {
      color: 'white',
    },
    '*': {
      boxSizing: 'border-box',
    },
  },
  theme: {
    tokens,
    textStyles,
  },
  outdir: 'src/styled-system',
});
