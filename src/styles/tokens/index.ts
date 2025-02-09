import { defineTokens } from '@pandacss/dev';
import { colorTokens } from './colors';
import { zIndexTokens } from './z-index';

export const tokens = defineTokens({
  colors: colorTokens,
  zIndex: zIndexTokens,
});
