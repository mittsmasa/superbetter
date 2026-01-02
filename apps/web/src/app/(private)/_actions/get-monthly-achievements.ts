import 'server-only';

import { differenceInDays, endOfMonth, startOfMonth } from 'date-fns';
import { fixToUTC, getTZDate } from '@/utils/date';
import { buildDailyAchievements } from './_utils/achievement-helpers';
import { getUser } from './get-user';
import type { Result } from './types/result';
import type { DailyAchievements } from './types/weekly-achievements';

export type MonthlyAchievements = DailyAchievements[];

export const getMonthlyAchievements = async (
  year?: number,
  month?: number,
): Promise<
  Result<MonthlyAchievements, { type: 'unknown'; message: string }>
> => {
  const now = getTZDate(new Date());
  const targetDate = year && month ? new Date(year, month - 1, 1) : now;
  const monthStart = fixToUTC(startOfMonth(targetDate));
  const monthEnd = fixToUTC(endOfMonth(targetDate));

  const user = await getUser();
  try {
    const daysInMonth = differenceInDays(monthEnd, monthStart);

    const monthlyAchievements = await buildDailyAchievements(
      user.id,
      monthStart,
      monthEnd,
      daysInMonth + 1,
      now,
    );

    return { type: 'ok', data: monthlyAchievements };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};
