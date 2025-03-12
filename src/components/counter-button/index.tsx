'use client';

import { Reload } from '@/assets/icons';
import { Button } from '@/components/button';
import { css } from '@/styled-system/css';
import { useCallback, useState } from 'react';
import { IconButton } from '../icon-button';

type Props = {
  name: string;
  label: string;
  defaultValue?: number;
  onChange?: (value: number) => void;
};

export const CounterButton = ({
  name,
  label,
  defaultValue = 0,
  onChange,
}: Props) => {
  const [count, setCount] = useState(defaultValue);

  const handleIncrement = useCallback(() => {
    const newCount = count + 1;
    setCount(newCount);
    onChange?.(newCount);
  }, [count, onChange]);

  const handleReset = useCallback(() => {
    setCount(0);
    onChange?.(0);
  }, [onChange]);

  return (
    <div className={css({ alignItems: 'center', display: 'flex', gap: '8px' })}>
      <Button
        type="button"
        full
        variant={count > 0 ? 'primary' : 'secondary'}
        onClick={handleIncrement}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            gap: '12px',
            textStyle: 'Body.primary',
          })}
        >
          <span className={css({ lineClamp: 1 })}>{label}</span>
          <span>{count}</span>
        </div>
      </Button>
      {count > 0 && (
        <IconButton type="button" onClick={handleReset}>
          <Reload className={css({ width: '[20px]', height: '[20px]' })} />
        </IconButton>
      )}
      <input type="hidden" name={name} value={count} />
    </div>
  );
};
