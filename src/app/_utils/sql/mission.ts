import { and, eq, gt, inArray, or, sql } from 'drizzle-orm';
import type { db } from '@/db/client';
import {
  epicwinHistories,
  epicwins,
  missionConditions,
  missions,
  powerupHistories,
  powerups,
  questHistories,
  quests,
  villainHistories,
  villains,
} from '@/db/schema/superbetter';

export const updateMissionConditions = async ({
  transaction: tx,
  userId,
  itemType,
  itemId,
}: {
  transaction: Parameters<Parameters<typeof db.transaction>['0']>['0'];
  userId: string;
  itemType: (typeof missionConditions.$inferSelect)['itemType'];
  itemId?: string;
}) => {
  const tragetMissons = await tx
    .select({
      missionId: sql`ANY_VALUE(mission.id)`
        .mapWith(missions.id)
        .as('missionId'),
      missionConditionId: sql`ANY_VALUE(missionCondition.id)`
        .mapWith(missionConditions.id)
        .as('missionConditionId'),
      maxCreatedAt: sql`MAX(missionCondition.createdAt)`.as('maxCreatedAt'),
    })
    .from(missions)
    .for('update')
    .innerJoin(missionConditions, eq(missions.id, missionConditions.missionId))
    .where(
      and(
        gt(missions.deadline, new Date()),
        eq(missions.userId, userId),
        eq(missionConditions.completed, false),
        eq(missionConditions.itemType, itemType),
        or(
          eq(missionConditions.conditionType, 'any'),
          and(
            eq(missionConditions.conditionType, 'specific'),
            itemId ? eq(missionConditions.itemId, itemId) : undefined,
          ),
        ),
      ),
    )
    .groupBy(missions.id);

  await tx
    .update(missionConditions)
    .set({ completed: true })
    .where(
      inArray(
        missionConditions.id,
        tragetMissons.map((m) => m.missionConditionId),
      ),
    );
};

export const revertMissionConditionsIfNeeded = async ({
  transaction: tx,
  userId,
  itemType,
  itemId,
}: {
  transaction: Parameters<Parameters<typeof db.transaction>['0']>['0'];
  userId: string;
  itemType: (typeof missionConditions.$inferSelect)['itemType'];
  itemId: string;
}) => {
  // 削除後の履歴総数を取得
  let historyCount = 0;

  if (itemType === 'powerup') {
    const [result] = await tx
      .select({ count: sql<number>`COUNT(*)` })
      .from(powerupHistories)
      .innerJoin(powerups, eq(powerupHistories.powerupId, powerups.id))
      .where(eq(powerups.userId, userId));
    historyCount = result?.count ?? 0;
  } else if (itemType === 'quest') {
    const [result] = await tx
      .select({ count: sql<number>`COUNT(*)` })
      .from(questHistories)
      .innerJoin(quests, eq(questHistories.questId, quests.id))
      .where(eq(quests.userId, userId));
    historyCount = result?.count ?? 0;
  } else if (itemType === 'villain') {
    const [result] = await tx
      .select({ count: sql<number>`COUNT(*)` })
      .from(villainHistories)
      .innerJoin(villains, eq(villainHistories.villainId, villains.id))
      .where(eq(villains.userId, userId));
    historyCount = result?.count ?? 0;
  } else if (itemType === 'epicwin') {
    const [result] = await tx
      .select({ count: sql<number>`COUNT(*)` })
      .from(epicwinHistories)
      .innerJoin(epicwins, eq(epicwinHistories.epicwinId, epicwins.id))
      .where(eq(epicwins.userId, userId));
    historyCount = result?.count ?? 0;
  }

  // conditionType='any' の completed = true の missionCondition を処理
  const anyConditions = await tx
    .select({ id: missionConditions.id })
    .from(missions)
    .innerJoin(missionConditions, eq(missions.id, missionConditions.missionId))
    .where(
      and(
        gt(missions.deadline, new Date()),
        eq(missions.userId, userId),
        eq(missionConditions.completed, true),
        eq(missionConditions.itemType, itemType),
        eq(missionConditions.conditionType, 'any'),
      ),
    );

  const anyCompletedCount = anyConditions.length;
  const anyRevertCount = Math.max(0, anyCompletedCount - historyCount);

  if (anyRevertCount > 0) {
    await tx
      .update(missionConditions)
      .set({ completed: false })
      .where(
        inArray(
          missionConditions.id,
          anyConditions.slice(0, anyRevertCount).map((c) => c.id),
        ),
      );
  }

  // conditionType='specific' の completed = true の missionCondition を処理
  let specificHistoryCount = 0;

  if (itemType === 'powerup') {
    const [result] = await tx
      .select({ count: sql<number>`COUNT(*)` })
      .from(powerupHistories)
      .innerJoin(powerups, eq(powerupHistories.powerupId, powerups.id))
      .where(and(eq(powerups.id, itemId), eq(powerups.userId, userId)));
    specificHistoryCount = result?.count ?? 0;
  } else if (itemType === 'quest') {
    const [result] = await tx
      .select({ count: sql<number>`COUNT(*)` })
      .from(questHistories)
      .innerJoin(quests, eq(questHistories.questId, quests.id))
      .where(and(eq(quests.id, itemId), eq(quests.userId, userId)));
    specificHistoryCount = result?.count ?? 0;
  } else if (itemType === 'villain') {
    const [result] = await tx
      .select({ count: sql<number>`COUNT(*)` })
      .from(villainHistories)
      .innerJoin(villains, eq(villainHistories.villainId, villains.id))
      .where(and(eq(villains.id, itemId), eq(villains.userId, userId)));
    specificHistoryCount = result?.count ?? 0;
  } else if (itemType === 'epicwin') {
    const [result] = await tx
      .select({ count: sql<number>`COUNT(*)` })
      .from(epicwinHistories)
      .innerJoin(epicwins, eq(epicwinHistories.epicwinId, epicwins.id))
      .where(and(eq(epicwins.id, itemId), eq(epicwins.userId, userId)));
    specificHistoryCount = result?.count ?? 0;
  }

  const specificConditions = await tx
    .select({ id: missionConditions.id })
    .from(missions)
    .innerJoin(missionConditions, eq(missions.id, missionConditions.missionId))
    .where(
      and(
        gt(missions.deadline, new Date()),
        eq(missions.userId, userId),
        eq(missionConditions.completed, true),
        eq(missionConditions.itemType, itemType),
        eq(missionConditions.conditionType, 'specific'),
        eq(missionConditions.itemId, itemId),
      ),
    );

  const specificCompletedCount = specificConditions.length;
  const specificRevertCount = Math.max(
    0,
    specificCompletedCount - specificHistoryCount,
  );

  if (specificRevertCount > 0) {
    await tx
      .update(missionConditions)
      .set({ completed: false })
      .where(
        inArray(
          missionConditions.id,
          specificConditions.slice(0, specificRevertCount).map((c) => c.id),
        ),
      );
  }
};
