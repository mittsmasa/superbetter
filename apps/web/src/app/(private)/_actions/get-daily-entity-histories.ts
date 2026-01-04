'use server';

import {
  getMissionsWithConditions,
  getTimeSeriesAdventureLogs,
} from '@/app/(private)/_actions/_utils/achievement-helpers';
import { isEditableDate } from '@/app/(private)/_actions/_utils/editable-date';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import type { missionConditions, missions } from '@/db/schema/superbetter';
import type { EntityType } from '@/db/types/mission';
import { getDateString, getStartAndEndOfDay } from '@/utils/date';

export const getDailyEntityHistories = async (
  date: Date,
): Promise<
  Result<
    {
      date: Date;
      dateString: string;
      isEditable: boolean;
      adventureLogs: {
        id: string;
        type: EntityType;
        title: string;
        createdAt: Date;
      }[];
      dailyMission?: typeof missions.$inferSelect & {
        missionConditions: (typeof missionConditions.$inferSelect)[];
      };
    },
    { type: 'unknown'; message: string }
  >
> => {
  const user = await getUser();
  const { start, end } = getStartAndEndOfDay(date);

  try {
    const [logs, dailyMissions] = await Promise.all([
      getTimeSeriesAdventureLogs(user.id, start, end),
      getMissionsWithConditions(user.id, start, end),
    ]);
    const adventureLogs = logs[0]?.adventureLogs ?? [];
    const dailyMission = dailyMissions.find(
      (m) => getDateString(m.deadline ?? new Date(0)) === getDateString(date),
    );

    return {
      type: 'ok',
      data: {
        date,
        dateString: logs[0]?.datetime ?? getDateString(date),
        isEditable: isEditableDate(date),
        adventureLogs,
        dailyMission,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};
