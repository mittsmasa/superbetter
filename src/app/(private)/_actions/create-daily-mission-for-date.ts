import 'server-only';

import { and, between, eq } from 'drizzle-orm';
import { getStartAndEndOfDay } from '@/app/_utils/date';
import { db } from '@/db/client';
import { missionConditions, missions } from '@/db/schema/superbetter';
import { getUser } from './get-user';
import type { Result } from './types/result';

/**
 * 指定した日付のデイリーミッションが存在するかどうかを確認します
 * 存在しなければ作成する
 */
export const createDailyMissionForDate = async (
  targetDate: Date,
): Promise<Result<undefined, { type: 'unknown'; message: string }>> => {
  const user = await getUser();
  const { start, end } = getStartAndEndOfDay(targetDate);

  try {
    const mission = await db.query.missions.findFirst({
      where: (mission) =>
        and(
          eq(mission.userId, user.id),
          eq(mission.type, 'system-daily'),
          between(mission.deadline, start, end),
        ),
    });
    if (mission) {
      return { type: 'ok', data: undefined };
    }
    await db.transaction(async (tx) => {
      const [{ id }] = await tx
        .insert(missions)
        .values({
          userId: user.id,
          title: 'デイリーミッション',
          description:
            '秘宝を使い、挑戦を受け、悪を討て\n小さな積み重ねが、真の英雄への道となる',
          type: 'system-daily',
          deadline: end,
        })
        .$returningId();
      await tx.insert(missionConditions).values([
        {
          missionId: id,
          conditionType: 'any',
          itemType: 'powerup',
        },
        {
          missionId: id,
          conditionType: 'any',
          itemType: 'powerup',
        },
        {
          missionId: id,
          conditionType: 'any',
          itemType: 'powerup',
        },
        {
          missionId: id,
          conditionType: 'any',
          itemType: 'quest',
        },
        {
          missionId: id,
          conditionType: 'any',
          itemType: 'villain',
        },
      ]);
    });
    return { type: 'ok', data: undefined };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};
