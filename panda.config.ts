import * as patterns from '@/styles/patterns';
import { textStyles } from '@/styles/text-styles';
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
      backgroundColor: 'black',
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
  patterns,
  outdir: 'src/styled-system',
});
