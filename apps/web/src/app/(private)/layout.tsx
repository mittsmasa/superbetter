import type { PropsWithChildren } from 'react';
import { FooterNavigation } from '@/components/navigation';
import { css } from '@/styled-system/css';

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '[100%]',
      })}
    >
      <div className={css({ flex: '1', overflow: 'hidden', minHeight: '[0]' })}>
        {children}
      </div>
      <div
        className={css({
          padding: '8px',
          backgroundColor: 'background',
        })}
      >
        <FooterNavigation />
      </div>
    </div>
  );
};

export default Layout;
