'use client';

import { useMemo, useState } from 'react';
import type { WeekelyAchievements } from '@/app/(private)/_actions/types/weekly-achievements';
import { AdventureLog } from '@/app/(private)/_components/adventure-log';
import { TimeSeriesChart } from '@/components/time-series-chart';
import { css } from '@/styled-system/css';

export const LogSection = ({
  weeklyAchievement,
}: {
  weeklyAchievement: WeekelyAchievements;
}) => {
  const [selectedDate, setSelectedDate] = useState(
    () => weeklyAchievement.find((d) => d.isToday)?.dateString,
  );
  const [showPosNegRatio, setShowPosNegRatio] = useState(true);

  const hasPosNegData = useMemo(
    () => weeklyAchievement.some((d) => d.posNegScore !== undefined),
    [weeklyAchievement],
  );
  const chartData = useMemo(
    () =>
      weeklyAchievement.map((d) => ({
        status: d.status,
        isToday: d.isToday,
        date: d.dateString,
        quest: d.adventureLogs.filter((log) => log.type === 'quest').length,
        powerup: d.adventureLogs.filter((log) => log.type === 'powerup').length,
        villain: d.adventureLogs.filter((log) => log.type === 'villain').length,
        epicwin: d.adventureLogs.filter((log) => log.type === 'epicwin').length,
        posNegRatio: d.posNegScore?.posNegRatio,
      })),
    [weeklyAchievement],
  );
  const achievement = weeklyAchievement.find(
    (d) => d.dateString === selectedDate,
  );
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        })}
      >
        <h2 className={css({ textStyle: 'Heading.primary' })}>冒険ログ</h2>
        {hasPosNegData && (
          <label
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              textStyle: 'Body.secondary',
            })}
          >
            <input
              type="checkbox"
              checked={showPosNegRatio}
              onChange={(e) => setShowPosNegRatio(e.target.checked)}
            />
            魔力測定
          </label>
        )}
      </div>
      <TimeSeriesChart
        onClickBar={setSelectedDate}
        data={chartData}
        showPosNegRatio={showPosNegRatio}
      />
      {achievement && (
        <AdventureLog
          heading={achievement.isToday ? '本日' : `${achievement.dateString}`}
          logs={achievement.adventureLogs}
        />
      )}
    </div>
  );
};
