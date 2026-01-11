import 'server-only';

import {
  addDays,
  differenceInDays,
  endOfDay,
  getDay,
  startOfDay,
  subMonths,
} from 'date-fns';
import { fixToUTC, getTZDate } from '@/utils/date';
import { buildDailyAchievements } from './_utils/achievement-helpers';
import { getOldestHistoryDate } from './_utils/get-oldest-history-date';
import { getUser } from './get-user';
import type { Result } from './types/result';
import type { DailyAchievements } from './types/weekly-achievements';

export type DynamicAchievements = {
  data: DailyAchievements[];
  periodDays: number;
};

export const getDynamicAchievements = async (): Promise<
  Result<DynamicAchievements, { type: 'unknown'; message: string }>
> => {
  const user = await getUser();
  const now = getTZDate(new Date());

  try {
    const oldestDate = await getOldestHistoryDate(user.id);

    let startDate: Date;
    let endDate: Date;
    let periodDays: number;

    if (!oldestDate) {
      // 履歴がない場合: 今週（月曜〜日曜）
      const day = getDay(now);
      const distanceToMonday = day === 0 ? 6 : day - 1;
      startDate = fixToUTC(startOfDay(addDays(now, -distanceToMonday)));
      endDate = fixToUTC(endOfDay(addDays(now, -distanceToMonday + 6)));
      periodDays = 7;
    } else {
      // 履歴がある場合: 最古日付から今日まで（最大3ヶ月）
      const threeMonthsAgo = subMonths(now, 3);
      const effectiveStart =
        oldestDate > threeMonthsAgo ? oldestDate : threeMonthsAgo;
      startDate = fixToUTC(startOfDay(effectiveStart));
      endDate = fixToUTC(endOfDay(now));
      periodDays = differenceInDays(endDate, startDate) + 1;
    }

    const achievements = await buildDailyAchievements(
      user.id,
      startDate,
      endDate,
      periodDays,
      now,
    );

    return { type: 'ok', data: { data: achievements, periodDays } };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};
