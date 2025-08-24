import 'server-only';

import { and, between, desc, eq } from 'drizzle-orm';
import { db } from '@/db/client';
import { testResults, testTypes } from '@/db/schema/superbetter';
import type { PosNegAnswer } from '@/db/types/test';

const dateFormatter = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  timeZone: 'Asia/Tokyo',
});

export const getTimeSeriesPosNegScores = async (
  userId: string,
  from: Date,
  to: Date,
): Promise<{ datetime: string; score: PosNegAnswer['answer'] }[]> => {
  const results = await db
    .select({
      answer: testResults.answer,
      createdAt: testResults.createdAt,
    })
    .from(testTypes)
    .innerJoin(testResults, eq(testTypes.id, testResults.testTypeId))
    .where(
      and(
        eq(testTypes.name, 'pos-neg'),
        eq(testResults.userId, userId),
        between(testResults.createdAt, from, to),
      ),
    )
    .orderBy(desc(testResults.createdAt));

  const scoresByDate = Object.groupBy(
    results.map((result: { answer: unknown; createdAt: Date }) => ({
      datetime: dateFormatter.format(result.createdAt),
      answer: result.answer as PosNegAnswer,
    })),
    (item: { datetime: string; answer: PosNegAnswer }) => item.datetime,
  );

  return Object.entries(scoresByDate).map(([datetime, scores]) => ({
    datetime,
    score: scores?.[0]?.answer.answer ?? {
      positive: 0,
      negative: 0,
      posNegRatio: 0,
    },
  }));
};
