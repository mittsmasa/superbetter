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
      {children}
      <div
        className={css({
          position: 'sticky',
          bottom: 0,
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
