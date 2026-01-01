import { defineSemanticTokens } from '@pandacss/dev';
import { colorsSemanticTokens } from './colors';

export const semanticTokens = defineSemanticTokens({
  colors: colorsSemanticTokens,
});
