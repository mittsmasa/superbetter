import { Header } from '@/app/(private)/_components/header';
import { CheckList } from '@/assets/icons';
import { ButtonLink } from '@/components/button';
import { css } from '@/styled-system/css';

const Page = () => {
  return (
    <main
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '[100%]',
        padding: '8px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        <Header />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            px: '12px',
          })}
        >
          <div
            className={css({
              alignItems: 'center',
              display: 'flex',
              gap: '12px',
            })}
          >
            <CheckList size={24} />
            <h1 className={css({ textStyle: 'Body.primary' })}>魔力測定</h1>
          </div>
          <p
            className={css({
              textStyle: 'Body.tertiary',
              color: 'foreground',
              whiteSpace: 'pre-wrap',
            })}
          >
            {description}
          </p>
        </div>
      </div>
      <div
        className={css({
          width: '[100%]',
          display: 'flex',
          justifyContent: 'center',
          py: '24px',
        })}
      >
        <ButtonLink href="/scan/pos-neg/question">魔力をはかる！</ButtonLink>
      </div>
    </main>
  );
};

export default Page;

const description = `
さあ、英雄よ。汝の魔力をスキャンするときだ
この世界において、魔力とはただの呪文を操る力ではない。汝の心の力――すなわち、日々の感情の流れこそが、真の魔力の源泉なのだ。


《そなえよ》
・今日の感情を振り返るのだ
・もし今朝起きたばかりなら、昨日の出来事を思い出してもよい
・感じたさまざまな感情を、リストを見ながらチェックせよ。
・感情の強さに応じて、1つ、2つ、3つ……好きなだけ数を増やしてよい
`;
