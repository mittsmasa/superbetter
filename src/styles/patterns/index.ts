import { definePattern } from '@pandacss/dev';

const pixelBorder = definePattern({
  defaultValues: {
    borderColor: 'border',
    borderWidth: 2,
  },
  description: 'A container that has pixel borders',
  properties: {
    borderColor: { type: 'token', value: 'colors' },
    borderWidth: { type: 'number' },
  },
  strict: true,
  transform(props) {
    const { borderColor, borderWidth } = props;
    return {
      '--pixel-border-color': `token(colors.${borderColor})`,
      '--pixel-border-width': `${borderWidth}px`,
      boxShadow:
        'calc(-1 * var(--pixel-border-width)) 0 0 0 var(--pixel-border-color), var(--pixel-border-width) 0 0 0 var(--pixel-border-color), 0 calc(-1 * var(--pixel-border-width)) 0 0 var(--pixel-border-color), 0 var(--pixel-border-width) 0 0 var(--pixel-border-color)',
    };
  },
});

export { pixelBorder };
