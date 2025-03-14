import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { testResults } from '@/db/schema/superbetter';
import { eq } from 'drizzle-orm';
import 'server-only';

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
      userId: user.id,
      testTypeId: testType.id,
      answer: {
        __typename: 'post-neg',
        answer: { positive: posScore, negative: negScore, posNegRatio },
      },
    });
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
  return { type: 'ok', data: undefined };
};
