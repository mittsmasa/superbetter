import { css, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';
import type { InputHTMLAttributes } from 'react';

export const Radio = ({
  label,
  ...props
}: { label: string } & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'value' | 'required'
>) => {
  return (
    <label
      className={cx(
        pixelBorder({ borderWidth: 1 }),
        css({
          display: 'flex',
          width: '[100%]',
        }),
      )}
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
            backgroundColor: 'white',
            color: 'black',
          },
        })}
      >
        {label}
      </span>
    </label>
  );
};
