import 'server-only';
import { and, desc, eq } from 'drizzle-orm';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { testResults, testTypes } from '@/db/schema/superbetter';
import type { PosNegAnswer } from '@/db/types/test';

export const getPosNegScores = async (): Promise<
  Result<
    {
      latest: PosNegAnswer['answer'] | undefined;
      previous: PosNegAnswer['answer'] | undefined;
    },
    {
      type: 'unknown';
      message: 'unknown error';
    }
  >
> => {
  const user = await getUser();
  try {
    const results = await db
      .select()
      .from(testTypes)
      .where(
        and(eq(testTypes.name, 'pos-neg'), eq(testResults.userId, user.id)),
      )
      .innerJoin(testResults, eq(testTypes.id, testResults.testTypeId))
      .orderBy(desc(testResults.createdAt));

    const latest = results.at(0)?.testResult.answer.answer;
    const previous = results.at(1)?.testResult.answer.answer;
    return {
      data: {
        latest,
        previous,
      },
      type: 'ok',
    };
  } catch (error) {
    return {
      error: { message: 'unknown error', type: 'unknown' },
      type: 'error',
    };
  }
};
