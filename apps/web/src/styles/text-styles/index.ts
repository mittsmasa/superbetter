import { defineTextStyles } from '@pandacss/dev';

export const textStyles = defineTextStyles({
  Heading: {
    primary: {
      value: {
        fontSize: '1rem',
        lineHeight: 1.5,
        fontWeight: 'normal',
      },
    },
    secondary: {
      value: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        fontWeight: 'normal',
      },
    },
    tertiary: {
      value: {
        fontSize: '0.75rem',
        lineHeight: 1.5,
        fontWeight: 'normal',
      },
    },
  },
  Body: {
    primary: {
      value: {
        fontSize: '1rem',
        lineHeight: 1.3,
        fontWeight: 'normal',
      },
    },
    secondary: {
      value: {
        fontSize: '0.875rem',
        lineHeight: 1.3,
        fontWeight: 'normal',
      },
    },
    tertiary: {
      value: {
        fontSize: '0.75rem',
        lineHeight: 1.3,
        fontWeight: 'normal',
      },
    },
    quaternary: {
      value: {
        fontSize: '0.625rem',
        lineHeight: 1.3,
        fontWeight: 'normal',
      },
    },
  },
});
