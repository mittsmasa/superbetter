import 'server-only';

import { addDays, endOfDay, getDay, startOfDay } from 'date-fns';
import { and, asc, between, desc, eq, sql } from 'drizzle-orm';
import { unionAll } from 'drizzle-orm/mysql-core';
import { fixToUTC, getTZDate } from '@/app/_utils/date';
import { db } from '@/db/client';
import {
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
import { getUser } from './get-user';
import type { AdventureLog } from './types/adventure-log';
import type { Result } from './types/result';
import type {
  DailyAchievements,
  WeekelyAchievements,
} from './types/weekly-achievements';

const dateFormatter = new Intl.DateTimeFormat('ja-JP', {
  day: 'numeric',
  month: 'numeric',
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
});

export const getWeeklyAchievements = async (): Promise<
  Result<WeekelyAchievements, { type: 'unknown'; message: string }>
> => {
  const now = getTZDate(new Date());
  const day = getDay(now);
  // day = 0: 日曜日, 1: 月曜日, ..., 6: 土曜日
  const distanceToMonday = day === 0 ? 6 : day - 1;
  const mondayStart = fixToUTC(startOfDay(addDays(now, -distanceToMonday)));
  const sundayEnd = fixToUTC(endOfDay(addDays(now, -distanceToMonday + 6)));

  const user = await getUser();
  try {
    const rows = await db
      .select()
      .from(missions)
      .where(
        and(
          eq(missions.userId, user.id),
          eq(missions.type, 'system-daily'),
          between(missions.deadline, mondayStart, sundayEnd),
        ),
      )
      .innerJoin(
        missionConditions,
        eq(missions.id, missionConditions.missionId),
      )
      .orderBy(desc(missionConditions.itemType), asc(missions.deadline));

    const missionWithConditions = Object.values(
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

    const entities = await getTimeSeriesAdventureLogs(
      user.id,
      mondayStart,
      sundayEnd,
    );

    const weekelyAchievements: WeekelyAchievements = Array.from({
      length: 7,
    })
      .map((_, i) => {
        const datetime = addDays(mondayStart, i);
        const datetimeString = dateFormatter.format(datetime);

        return {
          adventureLogs:
            entities.find((entity) => entity.datetime === datetimeString)
              ?.adventureLogs ?? [],
          date: datetime,
          dateString: datetimeString,
          status: 'no-data',
        } satisfies DailyAchievements;
      })
      .map((achievement) => {
        const isToday = achievement.dateString === dateFormatter.format(now);
        const mission = missionWithConditions.find(
          (mwc) =>
            dateFormatter.format(mwc.deadline ?? Date.UTC(0)) ===
            achievement.dateString,
        );
        if (!mission) {
          return achievement;
        }
        const completed = mission.missionConditions.every(
          (mc) => mc.completed === true,
        );

        return {
          ...achievement,
          isToday,
          status: completed ? 'achieved' : 'not-achieved',
        };
      });

    return { data: weekelyAchievements, type: 'ok' };
  } catch (e) {
    console.error(e);
    return {
      error: { message: 'unknown error', type: 'unknown' },
      type: 'error',
    };
  }
};

const getTimeSeriesAdventureLogs = async (
  userId: string,
  from: Date,
  to: Date,
): Promise<{ datetime: string; adventureLogs: AdventureLog[] }[]> => {
  const powerupLogs = db
    .select({
      createdAt: powerupHistories.createdAt,
      id: powerupHistories.id,
      title: powerups.title,
      type: sql<EntityType>`"powerup"`.as('type'),
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
      createdAt: questHistories.createdAt,
      id: questHistories.id,
      title: quests.title,
      type: sql<EntityType>`"quest"`.as('type'),
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
      createdAt: villainHistories.createdAt,
      id: villainHistories.id,
      title: villains.title,
      type: sql<EntityType>`"villain"`.as('type'),
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

  const entities = await unionAll(powerupLogs, questLogs, villainLogs).orderBy(
    desc(sql<string>`createdAt`),
  );

  const dateWithLog = Object.groupBy(
    entities.map((log) => ({
      ...log,
      datetime: dateFormatter.format(log.createdAt),
    })),
    ({ datetime }) => datetime,
  );
  return Object.entries(dateWithLog).map(([datetime, logs]) => {
    const SORT_ORDER = {
      epicwin: 4,
      powerup: 1,
      quest: 2,
      villain: 3,
    } as const satisfies Record<EntityType, number>;
    return {
      adventureLogs:
        logs?.sort((a, b) => {
          return SORT_ORDER[a.type] - SORT_ORDER[b.type];
        }) ?? [],
      datetime,
    };
  });
};
