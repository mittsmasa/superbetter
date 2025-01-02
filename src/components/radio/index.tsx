import { css, cx } from '@/styled-system/css';
import type { InputHTMLAttributes } from 'react';
import { PixelBorder } from '../pixel-border';

export const Radio = ({
  label,
  ...props
}: { label: string } & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'value' | 'onChange'
>) => {
  return (
    <PixelBorder width="[100%]">
      <label
        className={css({
          position: 'relative',
          width: '[100%]',
        })}
      >
        <input
          {...props}
          type="radio"
          className={cx('peer', css({ opacity: 0, position: 'absolute' }))}
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
    </PixelBorder>
  );
};
