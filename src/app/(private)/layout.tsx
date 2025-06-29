import type { PropsWithChildren } from 'react';
import { FooterNavigation } from '@/components/navigation';
import { css } from '@/styled-system/css';

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        height: '[100%]',
        justifyContent: 'space-between',
      })}
    >
      {children}
      <div
        className={css({
          backgroundColor: 'background',
          bottom: 0,
          padding: '8px',
          position: 'sticky',
        })}
      >
        <FooterNavigation />
      </div>
    </div>
  );
};

export default Layout;
