import type { PropsWithChildren } from 'react';
import { css } from '@/styled-system/css';

export const ExampleButton = ({
  onClick,
  children,
}: PropsWithChildren<{ onClick: () => void }>) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={css({ textStyle: 'Heading.primary' })}
    >
      {children}
    </button>
  );
};
