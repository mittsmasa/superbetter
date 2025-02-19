import { css } from '@/styled-system/css';
import { ConfigButton } from './_components/config-button';

const Page = async () => {
  return (
    <main
      className={css({
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      <div
        className={css({
          backgroundColor: 'black',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px',
          position: 'sticky',
          top: 0,
        })}
      >
        <h1 className={css({ textStyle: 'Heading.primary' })}>マイページ</h1>
        <ConfigButton />
      </div>
    </main>
  );
};

export default Page;
