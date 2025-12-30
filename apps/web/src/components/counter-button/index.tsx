'use client';

import { useCallback, useState } from 'react';
import { Reload } from '@/assets/icons';
import { css, cx, sva } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';
import { IconButton } from '../icon-button';

type Props = {
  name: string;
  label: string;
  onChange?: (value: number) => void;
};

const counterButtonRecipe = sva({
  slots: ['container', 'content', 'label', 'count'],
  base: {
    container: {
      padding: '4px',
    },
    content: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '8px',
      textStyle: 'Body.primary',
    },
    label: {
      lineClamp: 1,
    },
    count: {},
  },
  variants: {
    intensity: {
      0: {
        container: {
          backgroundColor: 'gray.900',
          borderColor: 'gray.800',
        },
        label: { color: 'gray.600' },
        count: { color: 'gray.600' },
      },
      1: {
        container: {
          backgroundColor: 'gray.800',
          borderColor: 'gray.700',
        },
        label: { color: 'gray.500' },
        count: { color: 'gray.500' },
      },
      2: {
        container: {
          backgroundColor: 'gray.700',
          borderColor: 'gray.600',
        },
        label: { color: 'gray.400' },
        count: { color: 'gray.400' },
      },
      3: {
        container: {
          backgroundColor: 'gray.600',
          borderColor: 'gray.500',
        },
        label: { color: 'gray.300' },
        count: { color: 'gray.300' },
      },
      4: {
        container: {
          backgroundColor: 'gray.500',
          borderColor: 'gray.400',
        },
        label: { color: 'gray.200' },
        count: { color: 'gray.200' },
      },
      5: {
        container: {
          backgroundColor: 'gray.400',
          borderColor: 'gray.300',
        },
        label: { color: 'white' },
        count: { color: 'white' },
      },
    },
  },
  defaultVariants: {
    intensity: 0,
  },
});

type Intensity = 0 | 1 | 2 | 3 | 4 | 5;

export const CounterButton = ({ name, label, onChange }: Props) => {
  const [count, setCount] = useState<Intensity>(0);
  const styles = counterButtonRecipe({ intensity: count });

  const handleIncrement = useCallback(() => {
    const newCount = Math.min(count + 1, 5) as Intensity;
    setCount(newCount);
    onChange?.(newCount);
  }, [count, onChange]);

  const handleReset = useCallback(() => {
    setCount(0);
    onChange?.(0);
  }, [onChange]);

  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '[100%]',
      })}
    >
      <button
        type="button"
        onClick={handleIncrement}
        className={cx(
          styles.container,
          pixelBorder({
            borderWidth: 1,
            borderColor:
              count === 0
                ? 'gray.600'
                : count === 1
                  ? 'gray.500'
                  : count === 2
                    ? 'gray.400'
                    : count === 3
                      ? 'gray.300'
                      : count === 4
                        ? 'gray.200'
                        : 'white',
          }),
          css({
            flex: '1',
            color: 'background',
          }),
        )}
      >
        <div className={styles.content}>
          <span className={styles.label}>{label}</span>
          <span className={styles.count}>{count}</span>
        </div>
      </button>
      {count > 0 && (
        <IconButton type="button" onClick={handleReset}>
          <Reload size={20} />
        </IconButton>
      )}
      <input type="hidden" name={name} value={count} />
    </div>
  );
};
