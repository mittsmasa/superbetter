import { FooterNavigation } from '@/components/navigation';
import { css } from '@/styled-system/css';
import type { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        height: '[100%]',
      })}
    >
      {children}
      <div
        className={css({
          position: 'sticky',
          bottom: 0,
          padding: '8px',
          backgroundColor: 'black',
        })}
      >
        <FooterNavigation />
      </div>
    </div>
  );
};

export default Layout;
