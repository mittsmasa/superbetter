import { Header } from '@/app/(private)/_components/header';
import { CheckList, Cloud, Sun } from '@/assets/icons';
import { Button } from '@/components/button';
import { CounterButton } from '@/components/counter-button';
import { css } from '@/styled-system/css';
import { redirect } from 'next/navigation';
import { postPosNegScore } from './_actions/pos-neg-score';

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
            position: 'sticky',
            top: 0,
            backgroundColor: 'black',
          })}
        >
          <Header
            rightSlot={
              <div
                className={css({ width: '[100%]', justifyContent: 'center' })}
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
                    className={css({ width: '[20px]', height: '[20px]' })}
                  />
                  <span>魔力測定</span>
                </div>
              </div>
            }
          />
        </div>
        <form
          action={async (f) => {
            'use server';
            const positives = f.getAll('positive');
            const negatives = f.getAll('negative');
            const posScore = positives.reduce((a, b) => a + Number(b), 0);
            const negScore = negatives.reduce((a, b) => a + Number(b), 0);
            const response = await postPosNegScore(posScore, negScore);
            if (response.type === 'error') {
              throw new Error(response.error.message);
            }
            redirect('/scan/pos-neg/result');
          }}
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            px: '12px',
            overflow: 'auto',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            })}
          >
            <div
              className={css({
                alignItems: 'center',
                display: 'flex',
                gap: '12px',
              })}
            >
              <Sun className={css({ width: '[20px]', height: '[20px]' })} />
              <h1 className={css({ textStyle: 'Body.secondary' })}>
                ポジティブ感情
              </h1>
            </div>
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              })}
            >
              <CounterButton name="positive" label="楽しみ / 笑い" />
              <CounterButton name="positive" label="誇り / 達成" />
              <CounterButton name="positive" label="他者への愛" />
              <CounterButton name="positive" label="興味 / 好奇心" />
              <CounterButton name="positive" label="希望 / 楽観" />
              <CounterButton
                name="positive"
                label="インスピレーション / モチベーション"
              />
              <CounterButton name="positive" label="平穏 / 落ち着き" />
              <CounterButton name="positive" label="感銘 / 感嘆" />
              <CounterButton name="positive" label="感謝 / 謝意" />
              <CounterButton name="positive" label="興奮 / エネルギー" />
              <CounterButton
                name="positive"
                label="つながり / 自分以上の何かの一部だと感じる"
              />
              <CounterButton name="positive" label="喜び / 至福" />
              <CounterButton name="positive" label="快楽 / 満足 / 充足感" />
              <CounterButton name="positive" label="（ポジティブな）驚き" />
              <CounterButton name="positive" label="何かに対する期待" />
              <CounterButton name="positive" label="楽しい記憶の余韻に浸る" />
            </div>
          </div>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            })}
          >
            <div
              className={css({
                alignItems: 'center',
                display: 'flex',
                gap: '12px',
              })}
            >
              <Cloud className={css({ width: '[20px]', height: '[20px]' })} />
              <h1 className={css({ textStyle: 'Body.secondary' })}>
                ネガティブ感情
              </h1>
            </div>
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              })}
            >
              <CounterButton name="negative" label="怒り" />
              <CounterButton name="negative" label="退屈" />
              <CounterButton name="negative" label="憂鬱" />
              <CounterButton name="negative" label="嫌悪感" />
              <CounterButton name="negative" label="気まずさ" />
              <CounterButton name="negative" label="恐怖" />
              <CounterButton name="negative" label="罪悪感" />
              <CounterButton name="negative" label="ストレス" />
              <CounterButton name="negative" label="絶望" />
              <CounterButton name="negative" label="悲しみ" />
              <CounterButton name="negative" label="恥" />
              <CounterButton name="negative" label="不満" />
              <CounterButton name="negative" label="孤独" />
              <CounterButton name="negative" label="将来に対する恐怖、不安" />
              <CounterButton name="negative" label="ネガティブな経験の反芻" />
              <CounterButton name="negative" label="誰かに対する憎悪" />
            </div>
          </div>
          <div
            className={css({
              padding: '12px',
              backgroundColor: 'black',
            })}
          >
            <Button type="submit" full>
              けっかをみる！
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Page;
