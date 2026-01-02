import { CheckList, CloudSun, Trophy } from '@/assets/icons';
import { EntityLink } from '@/components/entity-link';
import { css } from '@/styled-system/css';
import { getMonthlyAchievements } from '../_actions/get-monthly-achievements';
import { getWeeklyAchievements } from '../_actions/get-weekly-achievements';
import { getPosNegScores } from './_actions/get-pos-neg-scores';
import { ConfigButton } from './_components/config-button';
import { LogSection } from './_components/log-section';

const Page = async () => {
  const [weeklyResult, monthlyResult] = await Promise.all([
    getWeeklyAchievements(),
    getMonthlyAchievements(),
  ]);

  if (weeklyResult.type === 'error') {
    throw new Error(weeklyResult.error.message);
  }
  if (monthlyResult.type === 'error') {
    throw new Error(monthlyResult.error.message);
  }

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
          zIndex: 'overlay',
        })}
      >
        <h1 className={css({ textStyle: 'Heading.primary' })}>マイページ</h1>
        <ConfigButton />
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '8px',
        })}
      >
        <LogSection
          weeklyAchievement={weeklyResult.data}
          monthlyAchievement={monthlyResult.data}
        />
        <AchievementsSection />
        <ScanSection />
      </div>
    </main>
  );
};

export default Page;

const AchievementsSection = () => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      })}
    >
      <h2 className={css({ textStyle: 'Heading.primary' })}>実績</h2>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        <EntityLink
          href="/achievements"
          title={
            <div
              className={css({
                alignItems: 'center',
                display: 'flex',
                gap: '8px',
              })}
            >
              <Trophy size={20} />
              <span className={css({ textStyle: 'Body.primary' })}>
                実績を確認する
              </span>
            </div>
          }
          description="これまで達成した Epic Win のリストとデイリーミッション連続達成日数を確認できます。"
        />
      </div>
    </div>
  );
};

const ScanSection = async () => {
  const posNegScore = await getPosNegScores();
  if (posNegScore.type === 'error') {
    throw new Error(posNegScore.error.message);
  }

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      })}
    >
      <h2 className={css({ textStyle: 'Heading.primary' })}>測定の間</h2>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        <EntityLink
          href="/scan/pos-neg"
          title={
            <div
              className={css({
                display: 'flex',
                justifyContent: 'space-between',
              })}
            >
              <div
                className={css({
                  alignItems: 'center',
                  display: 'flex',
                  gap: '8px',
                })}
              >
                <CheckList size={20} />
                <span className={css({ textStyle: 'Body.primary' })}>
                  魔力測定
                </span>
              </div>
              <span className={css({ display: 'flex', gap: '8px' })}>
                <CloudSun size={20} />
                {posNegScore.data.latest?.posNegRatio.toFixed(1) ?? '未測定'}
              </span>
            </div>
          }
          description="この世界において、魔力とはただの呪文を操る力ではない。汝の心の力――すなわち、日々の感情の流れこそが、真の魔力の源泉なのだ。"
        />
      </div>
    </div>
  );
};
