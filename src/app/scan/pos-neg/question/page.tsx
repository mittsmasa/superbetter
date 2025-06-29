import { Header } from '@/app/(private)/_components/header';
import { CheckList } from '@/assets/icons';
import { css } from '@/styled-system/css';
import { PosNegScoreForm } from './_components/form';

const Page = () => {
  return (
    <main
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '[100%]',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        <div
          className={css({
            backgroundColor: 'background',
            position: 'sticky',
            top: 0,
          })}
        >
          <Header
            rightSlot={
              <div
                className={css({ justifyContent: 'center', width: '[100%]' })}
              >
                <div
                  className={css({
                    alignItems: 'center',
                    display: 'flex',
                    gap: '8px',
                    textStyle: 'Heading.primary',
                  })}
                >
                  <CheckList
                    className={css({ height: '[20px]', width: '[20px]' })}
                  />
                  <span>魔力測定</span>
                </div>
              </div>
            }
          />
        </div>
        <PosNegScoreForm />
      </div>
    </main>
  );
};

export default Page;
