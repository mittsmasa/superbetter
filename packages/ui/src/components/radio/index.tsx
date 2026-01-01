import type { InputHTMLAttributes } from 'react';
import { css, cx } from '../../styled-system/css';

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
          css({ opacity: 0, width: '[0px]', height: '[0px]' }),
        )}
      />
      <span
        className={css({
          textStyle: 'Body.secondary',
          display: 'flex',
          width: '[100%]',
          padding: '4px',
          _peerChecked: {
            backgroundColor: 'foreground',
            color: 'background',
          },
        })}
      >
        {label}
      </span>
    </label>
  );
};
