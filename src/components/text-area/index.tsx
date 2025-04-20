import { type ComponentProps, useId } from 'react';
import { css, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';

export const TextArea = ({
  label,
  ...props
}: { label?: string } & Omit<
  ComponentProps<'textarea'>,
  'type' | 'className'
>) => {
  const { rows = 5 } = props;
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
        rows={rows}
        id={id}
        className={cx(
          pixelBorder({ borderWidth: 2, borderColor: 'interactive.border' }),
          css({ padding: '4px', textStyle: 'Body.primary' }),
        )}
      />
    </div>
  );
};
