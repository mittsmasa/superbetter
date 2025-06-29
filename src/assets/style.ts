import { css } from '@/styled-system/css';

export const neonCurrentColor = css.raw({
  '--translucent-current-color':
    'color-mix(in srgb, currentColor 50%, transparent)',
  dropShadow:
    'drop-shadow(0px 0px 2px var(--translucent-current-color)) drop-shadow(0px 0px 4px var(--translucent-current-color))',
  filter: 'auto',
});
