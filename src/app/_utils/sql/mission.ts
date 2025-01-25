import type { db } from '@/db/client';
import { missionConditions, missions } from '@/db/schema/superbetter';
import { and, eq, gt, inArray, or, sql } from 'drizzle-orm';

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
      mission: missions,
      missionConditionId: sql`ANY_VALUE(missionCondition.id)`
        .mapWith(missionConditions.id)
        .as('missionConditionId'),
      maxCreatedAt: sql`MAX(missionCondition.createdAt)`.as('maxCreatedAt'),
    })
    .from(missions)
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
    .groupBy(missionConditions.missionId);

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
