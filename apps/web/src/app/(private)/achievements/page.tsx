import { css } from '@/styled-system/css';
import { getAchievedEpicWins } from '../_actions/get-achieved-epicwins';
import type { AchievedEpicWin } from '../_actions/types/achievements';
import { EntityIcon } from '../_components/entity-icon';

const Page = async () => {
  const achievedEpicWinsResult = await getAchievedEpicWins();

  if (achievedEpicWinsResult.type === 'error') {
    throw new Error(achievedEpicWinsResult.error.message);
  }

  const achievedEpicWins = achievedEpicWinsResult.data;

  return (
    <main
      className={css({
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      <div
        className={css({
          backgroundColor: 'background',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px',
          position: 'sticky',
          top: 0,
        })}
      >
        <h1 className={css({ textStyle: 'Heading.primary' })}>実績</h1>
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '8px',
        })}
      >
        <EpicWinsSection epicWins={achievedEpicWins} />
      </div>
    </main>
  );
};

export default Page;

const EpicWinsSection = ({ epicWins }: { epicWins: AchievedEpicWin[] }) => {
  return (
    <section
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      })}
    >
      <h2 className={css({ textStyle: 'Heading.primary' })}>
        達成した Epic Win
      </h2>
      {epicWins.length === 0 ? (
        <div
          className={css({
            alignItems: 'center',
            backgroundColor: 'background',
            borderRadius: '8px',
            display: 'flex',
            gap: '8px',
            padding: '16px',
            textAlign: 'center',
            color: 'foreground.secondary',
          })}
        >
          <span
            className={css({
              width: '[32px]',
              height: '[32px]',
              display: 'flex',
            })}
          >
            <EntityIcon itemType="epicwin" completed={false} />
          </span>
          <div className={css({ textStyle: 'Body.primary' })}>
            まだ Epic Win を達成していません
          </div>
        </div>
      ) : (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          })}
        >
          {epicWins.map((epicWin) => (
            <div
              key={epicWin.id}
              className={css({
                backgroundColor: 'background',
                borderRadius: '8px',
                padding: '12px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
              })}
            >
              <span className={css({ width: '[24px]', height: '[24px]' })}>
                <EntityIcon itemType="epicwin" completed={true} />
              </span>
              <div className={css({ flex: '1' })}>
                <h3
                  className={css({
                    textStyle: 'Body.primary',
                    fontWeight: 'bold',
                    marginBottom: '[4px]',
                  })}
                >
                  {epicWin.title}
                </h3>
                {epicWin.description && (
                  <p
                    className={css({
                      textStyle: 'Body.tertiary',
                      color: 'foreground.secondary',
                    })}
                  >
                    {epicWin.description}
                  </p>
                )}
                <time
                  className={css({
                    textStyle: 'Body.tertiary',
                    color: 'foreground.secondary',
                  })}
                >
                  達成日: {epicWin.achievedAt.toLocaleDateString('ja-JP')}
                </time>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
