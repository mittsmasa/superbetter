import 'server-only';

import { addDays } from 'date-fns';
import { and, asc, between, desc, eq, sql } from 'drizzle-orm';
import { unionAll } from 'drizzle-orm/mysql-core';
import { db } from '@/db/client';
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
import type { EntityType } from '@/db/types/mission';
import { getDateString } from '@/utils/date';
import type { AdventureLog } from '../types/adventure-log';
import type { DailyAchievements } from '../types/weekly-achievements';
import { getTimeSeriesPosNegScores } from './pos-neg-data';

export const getTimeSeriesAdventureLogs = async (
  userId: string,
  from: Date,
  to: Date,
): Promise<{ datetime: string; adventureLogs: AdventureLog[] }[]> => {
  const powerupLogs = db
    .select({
      id: powerupHistories.id,
      type: sql<EntityType>`"powerup"`.as('type'),
      title: powerups.title,
      createdAt: powerupHistories.createdAt,
    })
    .from(powerupHistories)
    .innerJoin(powerups, eq(powerupHistories.powerupId, powerups.id))
    .where(
      and(
        eq(powerups.userId, userId),
        between(powerupHistories.createdAt, from, to),
      ),
    )
    .orderBy(desc(powerupHistories.createdAt));

  const questLogs = db
    .select({
      id: questHistories.id,
      type: sql<EntityType>`"quest"`.as('type'),
      title: quests.title,
      createdAt: questHistories.createdAt,
    })
    .from(questHistories)
    .innerJoin(quests, eq(questHistories.questId, quests.id))
    .where(
      and(
        eq(quests.userId, userId),
        between(questHistories.createdAt, from, to),
      ),
    )
    .orderBy(desc(questHistories.createdAt));

  const villainLogs = db
    .select({
      id: villainHistories.id,
      type: sql<EntityType>`"villain"`.as('type'),
      title: villains.title,
      createdAt: villainHistories.createdAt,
    })
    .from(villainHistories)
    .innerJoin(villains, eq(villainHistories.villainId, villains.id))
    .where(
      and(
        eq(villains.userId, userId),
        between(villainHistories.createdAt, from, to),
      ),
    )
    .orderBy(desc(villainHistories.createdAt));

  const epicwinLogs = db
    .select({
      id: epicwinHistories.id,
      type: sql<EntityType>`"epicwin"`.as('type'),
      title: epicwins.title,
      createdAt: epicwinHistories.createdAt,
    })
    .from(epicwinHistories)
    .innerJoin(epicwins, eq(epicwinHistories.epicwinId, epicwins.id))
    .where(
      and(
        eq(epicwins.userId, userId),
        between(epicwinHistories.createdAt, from, to),
      ),
    )
    .orderBy(desc(epicwinHistories.createdAt));

  const entities = await unionAll(
    powerupLogs,
    questLogs,
    villainLogs,
    epicwinLogs,
  ).orderBy(desc(sql<string>`createdAt`));

  const dateWithLog = Object.groupBy(
    entities.map((log) => ({
      ...log,
      datetime: getDateString(log.createdAt),
    })),
    ({ datetime }) => datetime,
  );
  return Object.entries(dateWithLog).map(([datetime, logs]) => {
    const SORT_ORDER = {
      powerup: 1,
      quest: 2,
      villain: 3,
      epicwin: 4,
    } as const satisfies Record<EntityType, number>;
    return {
      datetime,
      adventureLogs:
        logs?.sort((a, b) => {
          return SORT_ORDER[a.type] - SORT_ORDER[b.type];
        }) ?? [],
    };
  });
};

export const getMissionsWithConditions = async (
  userId: string,
  from: Date,
  to: Date,
) => {
  const rows = await db
    .select()
    .from(missions)
    .where(
      and(
        eq(missions.userId, userId),
        eq(missions.type, 'system-daily'),
        between(missions.deadline, from, to),
      ),
    )
    .innerJoin(missionConditions, eq(missions.id, missionConditions.missionId))
    .orderBy(desc(missionConditions.itemType), asc(missions.deadline));

  return Object.values(
    rows.reduce<
      Record<
        string,
        typeof missions.$inferSelect & {
          missionConditions: (typeof missionConditions.$inferSelect)[];
        }
      >
    >((acc, row) => {
      const mission = row.mission;
      const missionCondition = row.missionCondition;

      if (!acc[mission.id]) {
        acc[mission.id] = {
          ...mission,
          missionConditions: [],
        };
      }
      acc[mission.id].missionConditions.push(missionCondition);
      return acc;
    }, {}),
  );
};

export const buildDailyAchievements = async (
  userId: string,
  from: Date,
  to: Date,
  dayCount: number,
  now: Date,
): Promise<DailyAchievements[]> => {
  const [entities, posNegScores, missionWithConditions] = await Promise.all([
    getTimeSeriesAdventureLogs(userId, from, to),
    getTimeSeriesPosNegScores(userId, from, to),
    getMissionsWithConditions(userId, from, to),
  ]);

  return Array.from({ length: dayCount })
    .map((_, i) => {
      const datetime = addDays(from, i);
      const datetimeString = getDateString(datetime);

      return {
        date: datetime,
        dateString: datetimeString,
        adventureLogs:
          entities.find((entity) => entity.datetime === datetimeString)
            ?.adventureLogs ?? [],
        status: 'no-data',
        posNegScore: posNegScores.find(
          (score) => score.datetime === datetimeString,
        )?.score,
      } satisfies DailyAchievements;
    })
    .map((achievement) => {
      const isToday = achievement.dateString === getDateString(now);
      const mission = missionWithConditions.find(
        (mwc) =>
          getDateString(mwc.deadline ?? new Date(0)) === achievement.dateString,
      );
      if (!mission) {
        return achievement;
      }
      const completed = mission.missionConditions.every(
        (mc) => mc.completed === true,
      );

      return {
        ...achievement,
        status: completed ? 'achieved' : 'not-achieved',
        isToday,
      };
    });
};
