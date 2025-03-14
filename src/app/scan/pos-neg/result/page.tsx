import { Header } from '@/app/(private)/_components/header';
import { CheckList, Cloud, CloudSun, Sun } from '@/assets/icons';
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
            withBackButton={false}
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
                  <span>魔力測定 結果</span>
                </div>
              </div>
            }
          />
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            justifyContent: 'center',
            px: '12px',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              textStyle: 'Body.secondary',
            })}
          >
            <div
              className={css({
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
              })}
            >
              <div
                className={css({
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                })}
              >
                <Sun className={css({ width: '[18px]', height: '[18px]' })} />
                <span>ポジティブ感情</span>
              </div>
              <span>5 (+1)</span>
            </div>
            <div
              className={css({
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
              })}
            >
              <div
                className={css({
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                })}
              >
                <Cloud className={css({ width: '[18px]', height: '[18px]' })} />
                <span>ネガティブ感情</span>
              </div>
              <span>5 (-3)</span>
            </div>
            <hr
              className={css({ height: '[1px]', backgroundColor: 'white' })}
            />
            <div
              className={css({
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
              })}
            >
              <div
                className={css({
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                })}
              >
                <CloudSun
                  className={css({ width: '[18px]', height: '[18px]' })}
                />
                <span>ポジネガ比</span>
              </div>
              <span className={css({ textStyle: 'Body.primary' })}>
                5/5 = 1.0 (+1.2)
              </span>
            </div>
          </div>
          <div
            className={css({
              textStyle: 'Body.tertiary',
              whiteSpace: 'pre-wrap',
            })}
          >
            {content}
          </div>
          <div className={css({ display: 'flex', justifyContent: 'center' })}>
            <ButtonLink variant="secondary" href="/me">
              マイページに戻る
            </ButtonLink>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;

const content = `
<<賢者からのことば>>
ポジネガ比が大きいほど、迷走神経緊張が強いといえよう。ポジネガ比が 1 以下であれば、ストレスに弱く恍惚後の成長(PEG)を経験できる可能性が低い。

ポジネガ比が 1 以上なら、おそらくすでにすばらしいレジリエンスを持っている。この数字を 2..3.. とあげていけば、汝はもっと強くなれるだろう

興味深いことに、ネガティブな感情の数をただ減らすだけではほとんどなんの恩恵もないことが、研究で明らかになっている

パワーアップアイテムをつかい、ポジティブ感情をふやすのだ！
`;
