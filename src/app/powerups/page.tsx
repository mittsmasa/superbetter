import { AddBox } from '@/assets/icons';
import { IconButton } from '@/components/icon-button';
import { FooterNavigation } from '@/components/navigation';
import { css } from '@/styled-system/css';

const Page = () => {
  return (
    <main
      className={css({
        height: '[100%]',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '8px 12px',
      })}
    >
      <div
        className={css({
          py: '8px',
          display: 'flex',
          justifyContent: 'space-between',
        })}
      >
        <h1 className={css({ textStyle: 'Heading.primary' })}>
          パワーアップアイテム
        </h1>
        <IconButton>
          <AddBox className={css({ width: '[24px]', height: '[24px]' })} />
        </IconButton>
      </div>
      <div
        className={css({
          position: 'sticky',
          bottom: '8px',
        })}
      >
        <FooterNavigation />
      </div>
    </main>
  );
};

export default Page;
