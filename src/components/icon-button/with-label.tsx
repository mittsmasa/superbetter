import { type ComponentProps, type PropsWithChildren, useId } from 'react';
import { css } from '@/styled-system/css';
import { IconButton } from '.';

export const IconButtonWithLabel = ({
  children,
  label,
  ...rest
}: PropsWithChildren<ComponentProps<typeof IconButton>> & {
  label: string;
}) => {
  const id = useId();
  return (
    <div
      className={css({
        alignItems: 'center',
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        gap: '8px',
      })}
    >
      <IconButton {...rest} id={id}>
        {children}
      </IconButton>
      <label htmlFor={id} className={css({ textStyle: 'Body.tertiary' })}>
        {label}
      </label>
    </div>
  );
};
