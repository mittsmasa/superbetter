import { useMemo, useState } from 'react';
import type { MonthlyAchievements } from '@/app/(private)/_actions/get-monthly-achievements';
import type {
  DailyAchievements,
  WeekelyAchievements,
} from '@/app/(private)/_actions/types/weekly-achievements';

export type PeriodType = 'week' | 'month';

export type PeriodAchievements = {
  period: PeriodType;
  data: DailyAchievements[];
};

export const usePeriodAchievements = (
  weeklyData: WeekelyAchievements,
  monthlyData?: MonthlyAchievements,
) => {
  const [periodType, setPeriodType] = useState<PeriodType>('week');

  const currentData = useMemo(() => {
    switch (periodType) {
      case 'week':
        return weeklyData;
      case 'month':
        return monthlyData ?? [];
      default:
        return weeklyData;
    }
  }, [periodType, weeklyData, monthlyData]);

  const chartData = useMemo(
    () =>
      currentData.map((d) => ({
        status: d.status,
        isToday: d.isToday,
        date: d.dateString,
        quest: d.adventureLogs.filter((log) => log.type === 'quest').length,
        powerup: d.adventureLogs.filter((log) => log.type === 'powerup').length,
        villain: d.adventureLogs.filter((log) => log.type === 'villain').length,
        epicwin: d.adventureLogs.filter((log) => log.type === 'epicwin').length,
        posNegRatio: d.posNegScore?.posNegRatio,
      })),
    [currentData],
  );

  const periodOptions = [
    { value: 'week', label: '週間' },
    { value: 'month', label: '月間' },
  ];

  return {
    periodType,
    setPeriodType,
    currentData,
    chartData,
    periodOptions,
    isMonthlyDataAvailable: Boolean(monthlyData),
  };
};
