'use server';

import { getDateString, getStartAndEndOfDay } from '@/app/_utils/date';
import { getTimeSeriesAdventureLogs } from '@/app/(private)/_actions/_utils/achievement-helpers';
import { isEditableDate } from '@/app/(private)/_actions/_utils/editable-date';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import type { EntityType } from '@/db/types/mission';

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
    },
    { type: 'unknown'; message: string }
  >
> => {
  const user = await getUser();
  const { start, end } = getStartAndEndOfDay(date);

  try {
    const logs = await getTimeSeriesAdventureLogs(user.id, start, end);
    const adventureLogs = logs[0]?.adventureLogs ?? [];

    return {
      type: 'ok',
      data: {
        date,
        dateString: logs[0]?.datetime ?? getDateString(date),
        isEditable: isEditableDate(date),
        adventureLogs,
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
