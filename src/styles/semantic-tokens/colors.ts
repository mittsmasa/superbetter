import { defineSemanticTokens } from '@pandacss/dev';

export const colorsSemanticTokens = defineSemanticTokens.colors({
  foreground: {
    DEFAULT: { value: '{colors.gray.50}' },
    primary: { value: '{colors.gray.50}' },
    secondary: { value: '{colors.gray.200}' },
    disabled: { value: '{colors.gray.500}' },
  },
  background: {
    DEFAULT: { value: '{colors.black}' },
  },
  border: {
    DEFAULT: { value: '{colors.gray.50}' },
    disabled: { value: '{colors.gray.500}' },
  },
  entity: {
    powerup: { value: '{colors.yellow.500}' },
    quest: { value: '{colors.cyan.500}' },
    villain: { value: '{colors.purple.600}' },
    disabled: { value: '{colors.gray.500}' },
  },
  chart: {
    grid: { value: '{colors.gray.600}' },
  },
});
