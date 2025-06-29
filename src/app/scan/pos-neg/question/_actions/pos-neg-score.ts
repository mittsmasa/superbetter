'use server';

import { eq } from 'drizzle-orm';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { testResults } from '@/db/schema/superbetter';

export const postPosNegScore = async (
  posScore: number,
  negScore: number,
): Promise<
  Result<undefined, { type: 'unknown'; message: 'unknown error' }>
> => {
  const user = await getUser();
  // 少数第一位までで四捨五入
  const posNegRatio =
    negScore > 0 ? Math.round((posScore / negScore) * 10) / 10 : 0;
  try {
    const testType = await db.query.testTypes.findFirst({
      where: (type) => eq(type.name, 'pos-neg'),
    });
    if (!testType) {
      throw new Error('testType not found');
    }
    await db.insert(testResults).values({
      answer: {
        __typename: 'post-neg',
        answer: { negative: negScore, positive: posScore, posNegRatio },
      },
      testTypeId: testType.id,
      userId: user.id,
    });
  } catch (e) {
    console.error(e);
    return {
      error: { message: 'unknown error', type: 'unknown' },
      type: 'error',
    };
  }
  return { data: undefined, type: 'ok' };
};
