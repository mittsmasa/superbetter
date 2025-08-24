import 'server-only';

import { addDays, endOfDay, getDay, startOfDay } from 'date-fns';
import { and, between, desc, eq } from 'drizzle-orm';
import { fixToUTC, getTZDate } from '@/app/_utils/date';
import { db } from '@/db/client';
import { testResults, testTypes } from '@/db/schema/superbetter';
import type { PosNegAnswer } from '@/db/types/test';
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
    const results = await db
      .select({
        id: testResults.id,
        answer: testResults.answer,
        createdAt: testResults.createdAt,
      })
      .from(testTypes)
      .where(
        and(
          eq(testTypes.name, 'pos-neg'),
          eq(testResults.userId, user.id),
          between(testResults.createdAt, mondayStart, sundayEnd),
        ),
      )
      .innerJoin(testResults, eq(testTypes.id, testResults.testTypeId))
      .orderBy(desc(testResults.createdAt));

    const resultsByDate = Object.groupBy(
      results.map((result) => ({
        ...result,
        dateString: dateFormatter.format(result.createdAt),
        answer: result.answer as PosNegAnswer,
      })),
      (item) => item.dateString,
    );

    const weeklyScores: WeeklyPosNegScores = Array.from({
      length: 7,
    }).map((_, i) => {
      const datetime = addDays(mondayStart, i);
      const datetimeString = dateFormatter.format(datetime);
      const dayResults = resultsByDate[datetimeString];
      const latestResult = dayResults?.[0];

      return {
        date: datetime,
        dateString: datetimeString,
        posNegScore: latestResult?.answer.answer,
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
