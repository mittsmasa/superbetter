import { defineSemanticTokens } from '@pandacss/dev';

export const colorsSemanticTokens = defineSemanticTokens.colors({
  foreground: {
    DEFAULT: { value: '{colors.gray.50}' },
    primary: { value: '{colors.gray.50}' },
    secondary: { value: '{colors.gray.100}' },
    disabled: { value: '{colors.gray.200}' },
  },
  background: {
    DEFAULT: { value: '{colors.black}' },
  },
  border: {
    DEFAULT: { value: '{colors.gray.50}' },
    disabled: { value: '{colors.gray.200}' },
  },
  entity: {
    powerup: { value: '{colors.yellow.500}' },
    quest: { value: '{colors.cyan.500}' },
    villain: { value: '{colors.purple.600}' },
  },
  chart: {
    grid: { value: '{colors.gray.600}' },
  },
});
