import 'server-only';

import { and, between, eq } from 'drizzle-orm';
import { cache } from 'react';
import { getStartAndEndOfDay } from '@/app/_utils/date';
import { db } from '@/db/client';
import { missionConditions, missions } from '@/db/schema/superbetter';
import { getUser } from './get-user';
import type { Result } from './types/result';

/**
 * 今日期限のデイリーミッションが存在するかどうかを確認します
 * 存在しなければ作成する
 */
export const createDailyMission = cache(
  async (): Promise<
    Result<undefined, { type: 'unknown'; message: string }>
  > => {
    const user = await getUser();
    const { start: todayStart, end: todayEnd } = getStartAndEndOfDay(
      new Date(),
    );

    try {
      const mission = await db.query.missions.findFirst({
        where: (mission) =>
          and(
            eq(mission.userId, user.id),
            eq(mission.type, 'system-daily'),
            between(mission.deadline, todayStart, todayEnd),
          ),
      });
      if (mission) {
        return { data: undefined, type: 'ok' };
      }
      await db.transaction(async (tx) => {
        const [{ id }] = await tx
          .insert(missions)
          .values({
            deadline: todayEnd,
            description:
              '秘宝を使い、挑戦を受け、悪を討て\n小さな積み重ねが、真の英雄への道となる',
            title: 'デイリーミッション',
            type: 'system-daily',
            userId: user.id,
          })
          .$returningId();
        await tx.insert(missionConditions).values([
          {
            conditionType: 'any',
            itemType: 'powerup',
            missionId: id,
          },
          {
            conditionType: 'any',
            itemType: 'powerup',
            missionId: id,
          },
          {
            conditionType: 'any',
            itemType: 'powerup',
            missionId: id,
          },
          {
            conditionType: 'any',
            itemType: 'quest',
            missionId: id,
          },
          {
            conditionType: 'any',
            itemType: 'villain',
            missionId: id,
          },
        ]);
      });
      return { data: undefined, type: 'ok' };
    } catch (e) {
      console.error(e);
      return {
        error: { message: 'unknown error', type: 'unknown' },
        type: 'error',
      };
    }
  },
);
