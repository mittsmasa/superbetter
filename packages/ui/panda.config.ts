import { defineConfig } from '@pandacss/dev';
import { keyframes } from './src/styles/keyframes';
import * as patterns from './src/styles/patterns';
import { semanticTokens } from './src/styles/semantic-tokens';
import { textStyles } from './src/styles/text-styles';
import { tokens } from './src/styles/tokens';

export default defineConfig({
  strictTokens: true,
  strictPropertyValues: true,
  preflight: false,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  theme: {
    tokens,
    semanticTokens,
    textStyles,
    keyframes,
  },
  patterns,
  outdir: 'src/styled-system',
});
