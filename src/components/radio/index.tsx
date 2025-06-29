import type { InputHTMLAttributes } from 'react';
import { css, cx } from '@/styled-system/css';

export const Radio = ({
  label,
  ...props
}: { label: string } & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'value' | 'required'
>) => {
  return (
    <label
      className={css({
        backgroundColor: 'interactive.background',
        display: 'flex',
        width: '[100%]',
      })}
    >
      <input
        {...props}
        type="radio"
        className={cx(
          'peer',
          css({ height: '[0px]', opacity: 0, width: '[0px]' }),
        )}
      />
      <span
        className={css({
          _peerChecked: {
            backgroundColor: 'foreground',
            color: 'background',
          },
          display: 'flex',
          padding: '4px',
          textStyle: 'Body.secondary',
          width: '[100%]',
        })}
      >
        {label}
      </span>
    </label>
  );
};
