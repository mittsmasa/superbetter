import { Calendar } from '@/assets/icons';
import { css } from '@/styled-system/css';
import { getAchievedEpicWins } from '../_actions/get-achieved-epicwins';
import { getDailyMissionStreak } from '../_actions/get-daily-mission-streak';
import { EntityIcon } from '../_components/entity-icon';

const Page = async () => {
  const [achievedEpicWinsResult, streakResult] = await Promise.all([
    getAchievedEpicWins(),
    getDailyMissionStreak(),
  ]);

  if (achievedEpicWinsResult.type === 'error') {
    throw new Error(achievedEpicWinsResult.error.message);
  }
  if (streakResult.type === 'error') {
    throw new Error(streakResult.error.message);
  }

  const achievedEpicWins = achievedEpicWinsResult.data;
  const streak = streakResult.data.streak;

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
        <StreakSection streak={streak} />
        <EpicWinsSection epicWins={achievedEpicWins} />
      </div>
    </main>
  );
};

export default Page;

const StreakSection = ({ streak }: { streak: number }) => {
  return (
    <section
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      })}
    >
      <h2 className={css({ textStyle: 'Heading.primary' })}>連続達成記録</h2>
      <div
        className={css({
          backgroundColor: 'background',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        })}
      >
        <Calendar
          className={css({
            width: '[24px]',
            height: '[24px]',
            color: streak > 0 ? 'foreground.primary' : 'foreground.secondary',
          })}
        />
        <div className={css({ flex: '1' })}>
          <div
            className={css({
              textStyle: 'Body.primary',
              marginBottom: '[4px]',
            })}
          >
            デイリーミッション連続達成
          </div>
          <div
            className={css({
              textStyle: 'Heading.secondary',
              color: streak > 0 ? 'foreground.primary' : 'foreground.secondary',
            })}
          >
            {streak}日
          </div>
        </div>
      </div>
    </section>
  );
};

const EpicWinsSection = ({
  epicWins,
}: {
  epicWins: Array<{
    id: string;
    title: string;
    description: string | null;
    achievedAt: Date;
  }>;
}) => {
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
