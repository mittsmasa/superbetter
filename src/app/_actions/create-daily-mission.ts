import 'server-only';

import { db } from '@/db/client';
import { missionConditions, missions } from '@/db/schema/superbetter';
import { TZDate } from '@date-fns/tz';
import { addDays, endOfDay, startOfDay } from 'date-fns';
import { and, between, eq } from 'drizzle-orm';
import { getUser } from './get-user';
import type { Result } from './types/result';

/**
 * 今日期限のデイリーミッションが存在するかどうかを確認します
 * 存在しなければ作成する
 */
export const createDailyMission = async (): Promise<
  Result<undefined, { type: 'unknown'; message: string }>
> => {
  const user = await getUser();

  const now = new TZDate(new Date(), 'Asia/Tokyo');
  // NOTE: ユーザーごとのタイムゾーンを使うように修正
  const todayStart = new Date(startOfDay(now));
  const tomorrowStart = new Date(addDays(todayStart, 1));
  const todayEnd = new Date(endOfDay(now));

  try {
    const mission = await db.query.missions.findFirst({
      where: (mission) =>
        and(
          eq(mission.userId, user.id),
          eq(mission.type, 'system-daily'),
          between(mission.deadline, todayStart, tomorrowStart),
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
          deadline: todayEnd,
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
