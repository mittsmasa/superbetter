'use server';

import { db } from '@/db/client';
import { missionConditions, missions } from '@/db/schema/superbetter';
import { tzDate } from '@formkit/tempo';
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
  try {
    // NOTE: 将来的にはユーザーごとにタイムゾーンを持たせてそれに基づいて計算する
    const tzNow = tzDate(new Date(), 'Asia/Tokyo');
    const todayStart = getTodaysStart(tzNow);
    const tomorrowStart = getTomorrowsStart(tzNow);
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
          deadline: getTodaysEnd(tzNow),
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

const getTodaysEnd = (now: Date) => {
  const deadline = new Date(now);
  deadline.setHours(23, 59, 59);
  return deadline;
};

const getTodaysStart = (now: Date) => {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  return today;
};

const getTomorrowsStart = (now: Date) => {
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
};
