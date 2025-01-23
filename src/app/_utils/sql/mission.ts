import { and, eq, gt, inArray, or } from 'drizzle-orm';
import type { db } from '../../../../db/client';
import { missionConditions, missions } from '../../../../db/schema/superbetter';

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
    .select()
    .from(missions)
    .where(
      and(
        gt(missions.deadline, new Date()),
        eq(missions.userId, userId),
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
    .innerJoin(missionConditions, eq(missions.id, missionConditions.missionId));

  await tx
    .update(missionConditions)
    .set({ completed: true })
    .where(
      inArray(
        missionConditions.id,
        tragetMissons.map((m) => m.missionCondition.id),
      ),
    );
};
