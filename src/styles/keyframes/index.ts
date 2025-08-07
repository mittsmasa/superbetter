import { defineKeyframes } from '@pandacss/dev';

export const keyframes = defineKeyframes({
  loading: {
    '100%': {
      clipPath: 'inset(0 -1ch 0 0)',
    },
  },
  entityPulse: {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.4)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
});
