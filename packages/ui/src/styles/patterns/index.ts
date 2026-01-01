import { definePattern } from '@pandacss/dev';

const pixelBorder = definePattern({
  description: 'A container that has pixel borders',
  defaultValues: {
    borderWidth: 2,
    borderColor: 'border',
  },
  properties: {
    borderWidth: { type: 'number' },
    borderColor: { type: 'token', value: 'colors' },
  },
  strict: true,
  transform(props) {
    const { borderColor, borderWidth } = props;
    return {
      '--pixel-border-width': `${borderWidth}px`,
      '--pixel-border-color': `token(colors.${borderColor})`,
      boxShadow:
        'calc(-1 * var(--pixel-border-width)) 0 0 0 var(--pixel-border-color), var(--pixel-border-width) 0 0 0 var(--pixel-border-color), 0 calc(-1 * var(--pixel-border-width)) 0 0 var(--pixel-border-color), 0 var(--pixel-border-width) 0 0 var(--pixel-border-color)',
    };
  },
});

export { pixelBorder };
