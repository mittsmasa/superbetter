import 'server-only';

import { fixDate, getTZDate } from '@/app/_utils/date';
import { db } from '@/db/client';
import { missionConditions, missions } from '@/db/schema/superbetter';
import { addDays, endOfDay, getDay, startOfDay } from 'date-fns';
import { and, asc, between, desc, eq } from 'drizzle-orm';
import { getUser } from './get-user';
import type { Result } from './types/result';
import type {
  DailyAchievements,
  WeekelyAchievements,
} from './types/weekly-achievements';

export const getWeeklyAchievements = async (): Promise<
  Result<WeekelyAchievements, { type: 'unknown'; message: string }>
> => {
  const now = getTZDate(new Date());
  const day = getDay(now);
  // day = 0: 日曜日, 1: 月曜日, ..., 6: 土曜日
  const distanceToMonday = day === 0 ? 6 : day - 1;
  const mondayStart = fixDate(startOfDay(addDays(now, -distanceToMonday)));
  const sundayEnd = fixDate(endOfDay(addDays(now, -distanceToMonday + 6)));

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
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      month: 'numeric',
      day: 'numeric',
      timeZone: 'Asia/Tokyo',
    });

    const weekelyAchievements: WeekelyAchievements = Array.from({
      length: 7,
    })
      .map((_, i) => {
        const datetime = addDays(mondayStart, i);
        return {
          datetime,
          status: 'no-data',
        } as const satisfies DailyAchievements;
      })
      .map((achievement) => {
        const isToday =
          dateFormatter.format(achievement.datetime) ===
          dateFormatter.format(now);

        const mission = missionWithConditions.find((mwc) => {
          return (
            dateFormatter.format(mwc.deadline ?? Date.UTC(0)) ===
            dateFormatter.format(achievement.datetime)
          );
        });
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

    return { type: 'ok', data: weekelyAchievements };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};
