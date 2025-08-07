import { defineKeyframes } from '@pandacss/dev';

export const keyframes = defineKeyframes({
  loading: {
    '100%': {
      clipPath: 'inset(0 -1ch 0 0)',
    },
  },
});
