'use client';

import type { WeekelyAchievements } from '@/app/(private)/_actions/types/weekly-achievements';
import { AdventureLog } from '@/app/(private)/_components/adventure-log';
import { TimeSeriesChart } from '@/components/time-series-chart';
import { css } from '@/styled-system/css';
import { useMemo, useState } from 'react';

export const LogSection = ({
  weeklyAchievement,
}: {
  weeklyAchievement: WeekelyAchievements;
}) => {
  const [selectedDate, setSelectedDate] = useState(
    () => weeklyAchievement.find((d) => d.isToday)?.dateString,
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
      <h2 className={css({ textStyle: 'Heading.primary' })}>冒険ログ</h2>
      <TimeSeriesChart onClickBar={setSelectedDate} data={chartData} />
      {achievement && (
        <AdventureLog
          heading={achievement.isToday ? '本日' : `${achievement.dateString}`}
          logs={achievement.adventureLogs}
        />
      )}
    </div>
  );
};
