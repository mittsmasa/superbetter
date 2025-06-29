/** biome-ignore-all assist/source/useSortedKeys: 設定ファイルは設定値の並びを維持する */
import { defineConfig } from '@pandacss/dev';
import { keyframes } from '@/styles/keyframes';
import * as patterns from '@/styles/patterns';
import { semanticTokens } from '@/styles/semantic-tokens';
import { textStyles } from '@/styles/text-styles';
import { tokens } from '@/styles/tokens';

export default defineConfig({
  strictTokens: true,
  strictPropertyValues: true,
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
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
  theme: {
    tokens,
    semanticTokens,
    textStyles,
    keyframes,
  },
  patterns,
  outdir: 'src/styled-system',
});
