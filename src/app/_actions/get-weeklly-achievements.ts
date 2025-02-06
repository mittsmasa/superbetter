import 'server-only';

import { db } from '@/db/client';
import { missionConditions, missions } from '@/db/schema/superbetter';
import { TZDate } from '@date-fns/tz';
import { addDays, endOfDay, getDay, startOfDay } from 'date-fns';
import { and, asc, between, desc, eq } from 'drizzle-orm';
import { cacheTag } from '../_utils/cache/cahce-tag';
import { getUser } from './get-user';
import type { Result } from './types/result';
import type {
  DailyAchievements,
  WeekelyAchievements,
} from './types/weekly-achievements';

export const getWeeklyAchievements = async (): Promise<
  Result<WeekelyAchievements, { type: 'unknown'; message: string }>
> => {
  const user = await getUser();
  try {
    const weekelyAchievements = await getAchievements(user);

    return { type: 'ok', data: weekelyAchievements };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};

const getAchievements = async (user: {
  id: string;
}): Promise<WeekelyAchievements> => {
  'use cache';
  cacheTag('mission-achievement');

  // NOTE: ユーザーごとのタイムゾーンを使うように修正
  const now = new TZDate(new Date(), 'Asia/Tokyo');
  const day = getDay(now);
  // day = 0: 日曜日, 1: 月曜日, ..., 6: 土曜日
  const distanceToMonday = day === 0 ? 6 : day - 1;
  const mondayStart = new Date(startOfDay(addDays(now, -distanceToMonday)));
  const sundayEnd = new Date(endOfDay(addDays(now, -distanceToMonday + 6)));

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
    .innerJoin(missionConditions, eq(missions.id, missionConditions.missionId))
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
  return weekelyAchievements;
};
