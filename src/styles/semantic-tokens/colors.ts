import { defineSemanticTokens } from '@pandacss/dev';

export const colorsSemanticTokens = defineSemanticTokens.colors({
  foreground: {
    DEFAULT: { value: '{colors.gray.100}' },
    primary: { value: '{colors.gray.100}' },
    secondary: { value: '{colors.gray.200}' },
    alt: { value: '{colors.black}' },
    disabled: { value: '{colors.gray.300}' },
  },
  background: {
    DEFAULT: { value: '{colors.black}' },
    primary: { value: '{colors.black}' },
    alt: { value: '{colors.gray.100}' },
  },
  interactive: {
    border: {
      DEFAULT: { value: '{colors.gray.600}' },
      disabled: { value: '{colors.gray.300}' },
      alt: { value: '{colors.gray.100}' },
    },
    background: {
      DEFAULT: { value: '{colors.gray.800}' },
      hover: { value: '{colors.gray.700}' },
      active: { value: '{colors.gray.600}' },
      alt: { value: '{colors.gray.100}' },
    },
    foreground: {
      DEFAULT: { value: '{colors.gray.100}' },
      disabled: { value: '{colors.gray.300}' },
      alt: { value: '{colors.gray.800}' },
    },
  },
  border: {
    DEFAULT: { value: '{colors.gray.200}' },
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
