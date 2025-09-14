import 'server-only';

import { addDays, endOfDay, getDay, startOfDay } from 'date-fns';
import { fixToUTC, getTZDate } from '@/app/_utils/date';
import { buildDailyAchievements } from './_utils/achievement-helpers';
import { getUser } from './get-user';
import type { Result } from './types/result';
import type { WeekelyAchievements } from './types/weekly-achievements';

export const getWeeklyAchievements = async (): Promise<
  Result<WeekelyAchievements, { type: 'unknown'; message: string }>
> => {
  const now = getTZDate(new Date());
  const day = getDay(now);
  // day = 0: 日曜日, 1: 月曜日, ..., 6: 土曜日
  const distanceToMonday = day === 0 ? 6 : day - 1;
  const mondayStart = fixToUTC(startOfDay(addDays(now, -distanceToMonday)));
  const sundayEnd = fixToUTC(endOfDay(addDays(now, -distanceToMonday + 6)));

  const user = await getUser();
  try {
    const weekelyAchievements = await buildDailyAchievements(
      user.id,
      mondayStart,
      sundayEnd,
      7,
      now,
    );

    return { type: 'ok', data: weekelyAchievements };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};
