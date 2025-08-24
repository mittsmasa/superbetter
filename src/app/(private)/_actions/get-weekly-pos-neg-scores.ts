import 'server-only';

import { addDays, endOfDay, getDay, startOfDay } from 'date-fns';
import { fixToUTC, getTZDate } from '@/app/_utils/date';
import type { PosNegAnswer } from '@/db/types/test';
import { getTimeSeriesPosNegScores } from './_utils/pos-neg-data';
import { getUser } from './get-user';
import type { Result } from './types/result';

export type DailyPosNegScore = {
  dateString: string;
  date: Date;
  posNegScore?: PosNegAnswer['answer'];
};

export type WeeklyPosNegScores = DailyPosNegScore[];

const dateFormatter = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  timeZone: 'Asia/Tokyo',
});

export const getWeeklyPosNegScores = async (): Promise<
  Result<WeeklyPosNegScores, { type: 'unknown'; message: string }>
> => {
  const now = getTZDate(new Date());
  const day = getDay(now);
  const distanceToMonday = day === 0 ? 6 : day - 1;
  const mondayStart = fixToUTC(startOfDay(addDays(now, -distanceToMonday)));
  const sundayEnd = fixToUTC(endOfDay(addDays(now, -distanceToMonday + 6)));

  const user = await getUser();

  try {
    const posNegScores = await getTimeSeriesPosNegScores(
      user.id,
      mondayStart,
      sundayEnd,
    );

    const weeklyScores: WeeklyPosNegScores = Array.from({
      length: 7,
    }).map((_, i) => {
      const datetime = addDays(mondayStart, i);
      const datetimeString = dateFormatter.format(datetime);
      const scoreData = posNegScores.find(
        (score) => score.datetime === datetimeString,
      );

      return {
        date: datetime,
        dateString: datetimeString,
        posNegScore: scoreData?.score,
      };
    });

    return { type: 'ok', data: weeklyScores };
  } catch (error) {
    console.error('Error fetching weekly pos-neg scores:', error);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};
