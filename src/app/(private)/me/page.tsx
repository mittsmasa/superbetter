import { CheckList, CloudSun } from '@/assets/icons';
import { TimeSeriesChart } from '@/components/time-series-chart';
import { css } from '@/styled-system/css';
import { getWeeklyAchievements } from '../_actions/get-weeklly-achievements';
import { AdventureLog } from '../_components/adventure-log';
import { EntityLink } from '../_components/entity-link';
import { getPosNegScores } from './_actions/get-pos-neg-scores';
import { ConfigButton } from './_components/config-button';

const Page = async () => {
  const posNegScore = await getPosNegScores();
  if (posNegScore.type === 'error') {
    throw new Error(posNegScore.error.message);
  }
  const achievement = await getWeeklyAchievements();
  if (achievement.type === 'error') {
    throw new Error(achievement.error.message);
  }
  const chartData = achievement.data.map((d) => ({
    date: d.dateString,
    quest: d.adventureLogs.filter((log) => log.type === 'quest').length,
    powerup: d.adventureLogs.filter((log) => log.type === 'powerup').length,
    villain: d.adventureLogs.filter((log) => log.type === 'villain').length,
  }));
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
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
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
          <h2 className={css({ textStyle: 'Heading.primary' })}>冒険ログ</h2>
          <TimeSeriesChart data={chartData} />
          <AdventureLog heading={''} logs={[]} />
        </div>
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
                    <CheckList
                      className={css({ width: '[20px]', height: '[20px]' })}
                    />
                    <span className={css({ textStyle: 'Body.primary' })}>
                      魔力測定
                    </span>
                  </div>
                  <span className={css({ display: 'flex', gap: '8px' })}>
                    <CloudSun
                      className={css({ width: '[20px]', height: '[20px]' })}
                    />
                    {posNegScore.data.latest?.posNegRatio.toFixed(1) ??
                      '未測定'}
                  </span>
                </div>
              }
              description="この世界において、魔力とはただの呪文を操る力ではない。汝の心の力――すなわち、日々の感情の流れこそが、真の魔力の源泉なのだ。"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
