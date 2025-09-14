'use server';

import { subDays } from 'date-fns';
import { fixToUTC, getDateString, getTZDate } from '@/app/_utils/date';
import { getMissionsWithConditions } from './_utils/achievement-helpers';
import { getUser } from './get-user';
import type { Result } from './types/result';

export const getDailyMissionStreak = async (): Promise<
  Result<{ streak: number }, { type: 'unknown'; message: string }>
> => {
  const user = await getUser();

  try {
    const now = getTZDate(new Date());

    // 過去30日分のミッションを取得（十分な日数を確保）
    const from = fixToUTC(subDays(now, 30));
    const to = fixToUTC(now);

    const missionsWithConditions = await getMissionsWithConditions(
      user.id,
      from,
      to,
    );

    // 日付順にソート（最新が先頭）
    const sortedMissions = missionsWithConditions
      .filter((mission) => mission.deadline)
      .sort((a, b) => {
        if (!a.deadline || !b.deadline) return 0;
        const aDate = getDateString(a.deadline);
        const bDate = getDateString(b.deadline);
        return bDate.localeCompare(aDate);
      });

    let streak = 0;
    let currentDate = now;
    let dayIndex = 0;

    // 今日から遡って連続達成日数をカウント
    while (dayIndex < 30) {
      // 最大30日まで遡る
      const dateString = getDateString(currentDate);

      // 該当日のミッションを検索
      const mission = sortedMissions.find(
        (m) => m.deadline && getDateString(m.deadline) === dateString,
      );

      if (!mission) {
        // ミッションが存在しない場合、連続記録を停止
        break;
      }

      // 全ての条件が完了しているかチェック
      const completed = mission.missionConditions.every(
        (condition) => condition.completed === true,
      );

      if (completed) {
        streak++;
      } else {
        // 完了していない日があれば連続記録を停止
        break;
      }

      // 前日に進む
      currentDate = subDays(currentDate, 1);
      dayIndex++;
    }

    return { type: 'ok', data: { streak } };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};
