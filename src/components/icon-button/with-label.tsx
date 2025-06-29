import { type ComponentProps, type PropsWithChildren, useId } from 'react';
import { sva } from '@/styled-system/css';
import { IconButton } from '.';

const withLabel = sva({
  base: {
    root: {
      alignItems: 'center',
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
    },
  },
  defaultVariants: { size: 'md' },
  slots: ['root', 'label'],
  variants: {
    size: {
      lg: {
        label: {
          textStyle: 'Body.tertiary',
        },
        root: {
          gap: '6px',
        },
      },
      md: {
        label: {
          textStyle: 'Body.quaternary',
        },
        root: {
          gap: '4px',
        },
      },
      sm: {
        label: {
          textStyle: 'Body.quaternary',
        },
        root: {
          gap: '4px',
        },
      },
      xl: {
        label: {
          textStyle: 'Body.tertiary',
        },
        root: {
          gap: '8px',
        },
      },
    },
  },
});

export const IconButtonWithLabel = ({
  children,
  label,
  ...rest
}: PropsWithChildren<ComponentProps<typeof IconButton>> & {
  label: string;
}) => {
  const id = useId();
  const { root, label: labelStyle } = withLabel({
    size: rest.size,
  });
  return (
    <div className={root}>
      <IconButton {...rest} id={id}>
        {children}
      </IconButton>
      <label htmlFor={id} className={labelStyle}>
        {label}
      </label>
    </div>
  );
};
