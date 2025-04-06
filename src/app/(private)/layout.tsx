import type { PropsWithChildren } from 'react';
import { FooterNavigation } from '@/components/navigation';
import { css } from '@/styled-system/css';
import { createDailyMission } from './_actions/create-daily-mission';

const Layout = async ({ children }: PropsWithChildren) => {
  // プライベートページのどこかにリクエストしたら
  await createDailyMission();
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
