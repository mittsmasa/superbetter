'use client';

import { Minus, Plus } from '@/assets/icons';
import { useTapFeeling } from '@/hooks/feeling';
import { css, cva } from '@/styled-system/css';
import { type ComponentProps, useState } from 'react';
import { IconButton } from '../icon-button';

const numberInput = cva({
  base: {
    cursor: 'pointer',
    padding: '8px',
    textStyle: 'Body.primary',
    _disabled: {
      cursor: 'unset',
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: 'background',
        color: 'foreground',
        _disabled: {
          color: 'gray.200',
        },
      },
      secondary: {
        backgroundColor: 'foreground',
        color: 'background',
        _disabled: {
          backgroundColor: 'gray.200',
        },
      },
    },
  },
  defaultVariants: { variant: 'primary' },
});

export type NumberInputProps = {
  value?: number;
  onChange?: (value: number) => void;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  variant?: 'primary' | 'secondary';
} & Pick<ComponentProps<'input'>, 'disabled' | 'aria-label' | 'name'>;

/** value と onChange or defaultValue を設定 */
export const NumberInput = ({
  name,
  min,
  max,
  step = 1,
  variant,
  disabled,
  'aria-label': ariaLabel,
  ...props
}: NumberInputProps) => {
  const feeling = useTapFeeling();
  const [value, setValue] = useState(props.value ?? props.defaultValue ?? 0);
  const onChange = props.onChange ?? setValue;

  const handleIncrease = () => {
    if (disabled) return;
    const newValue =
      max !== undefined ? Math.min(value + step, max) : value + step;
    onChange(newValue);
  };

  const handleDecrease = () => {
    if (disabled) return;
    const newValue =
      min !== undefined ? Math.max(value - step, min) : value - step;
    onChange(newValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const newValue = Number(e.target.value);
    if (Number.isNaN(newValue)) return;

    let finalValue = newValue;
    if (min !== undefined) finalValue = Math.max(finalValue, min);
    if (max !== undefined) finalValue = Math.min(finalValue, max);

    onChange(finalValue);
  };

  return (
    <div
      className={css(
        {
          alignItems: 'center',
          display: 'flex',
          gap: '4px',
        },
        numberInput.raw({ variant }),
      )}
    >
      <IconButton
        type="button"
        onClick={handleDecrease}
        disabled={disabled || (min !== undefined && value <= min)}
        aria-label="減少"
        {...feeling.props}
      >
        <Minus className={css({ width: '[18px]', height: '[18px]' })} />
      </IconButton>
      <input
        name={name}
        type="number"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        aria-label={ariaLabel}
        className={css({
          textStyle: 'Body.secondary',
          width: '[100%]',
          textAlign: 'center',
          bg: 'transparent',
          border: 'none',
          _focus: { outline: 'none' },
          _disabled: { cursor: 'not-allowed' },
        })}
      />
      <IconButton
        type="button"
        onClick={handleIncrease}
        disabled={disabled || (max !== undefined && value >= max)}
        aria-label="増加"
        {...feeling.props}
      >
        <Plus className={css({ width: '[18px]', height: '[18px]' })} />
      </IconButton>
    </div>
  );
};
