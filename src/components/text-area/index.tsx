import { css, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';
import { type ComponentProps, useId } from 'react';

export const TextArea = ({
  label,
  ...props
}: { label?: string } & Omit<
  ComponentProps<'textarea'>,
  'type' | 'className'
>) => {
  const id = useId();
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      })}
    >
      <label htmlFor={id} className={css({ textStyle: 'Body.tertiary' })}>
        {label}
      </label>
      <textarea
        {...props}
        id={id}
        className={cx(
          pixelBorder({}),
          css({ padding: '4px', textStyle: 'Body.primary' }),
        )}
      />
    </div>
  );
};
