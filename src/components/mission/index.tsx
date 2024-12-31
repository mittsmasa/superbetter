import { css } from '@/styled-system/css';
import type { PropsWithChildren } from 'react';

export const Mission = ({ children }: PropsWithChildren) => {
  return (
    <div className={css({ textStyle: 'Heading.primary' })}>{children}</div>
  );
};
