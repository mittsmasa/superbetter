import { type ComponentProps, type PropsWithChildren, useId } from 'react';
import { sva } from '../../styled-system/css';
import { IconButton } from '.';

const withLabel = sva({
  slots: ['root', 'label'],
  base: {
    root: {
      alignItems: 'center',
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
    },
  },
  defaultVariants: { size: 'md' },
  variants: {
    size: {
      sm: {
        root: {
          gap: '4px',
        },
        label: {
          textStyle: 'Body.quaternary',
        },
      },
      md: {
        root: {
          gap: '4px',
        },
        label: {
          textStyle: 'Body.quaternary',
        },
      },
      lg: {
        root: {
          gap: '6px',
        },
        label: {
          textStyle: 'Body.tertiary',
        },
      },
      xl: {
        root: {
          gap: '8px',
        },
        label: {
          textStyle: 'Body.tertiary',
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
