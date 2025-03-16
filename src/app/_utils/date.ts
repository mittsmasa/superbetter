import { TZDate } from '@date-fns/tz';
import { endOfDay } from 'date-fns/endOfDay';
import { startOfDay } from 'date-fns/startOfDay';

const getTZDate = (date: Date, timezone = 'Asia/Tokyo') => {
  const now = new TZDate(date, timezone);
  return now;
};

/**
 * startOfDay や endOfDay がサーバーのタイムゾーンで処理されてしまうため
 * @param date
 * @returns
 */
const fixDate = (date: Date) => {
  return new Date(date);
};

export const getStartAndEndOfDay = (date: Date) => {
  const now = getTZDate(date);
  const start = fixDate(startOfDay(now));
  const end = fixDate(endOfDay(now));
  return { start, end };
};
