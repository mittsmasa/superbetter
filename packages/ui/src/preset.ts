import { definePreset } from '@pandacss/dev';
import { keyframes } from './styles/keyframes';
import * as patterns from './styles/patterns';
import { semanticTokens } from './styles/semantic-tokens';
import { textStyles } from './styles/text-styles';
import { tokens } from './styles/tokens';

export const uiPreset = definePreset({
  name: '@superbetter/ui',
  theme: {
    tokens,
    semanticTokens,
    textStyles,
    keyframes,
  },
  patterns,
});
