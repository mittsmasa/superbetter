import { TZDate } from '@date-fns/tz';
import { endOfDay } from 'date-fns/endOfDay';
import { startOfDay } from 'date-fns/startOfDay';

export const getTZDate = (date: Date, timezone = 'Asia/Tokyo') => {
  const now = new TZDate(date, timezone);
  return now;
};

/**
 * UTCに固定する
 * @param date
 * @returns
 */
export const fixToUTC = (date: Date) => {
  return new Date(date);
};

export const getStartAndEndOfDay = (date: Date) => {
  const now = getTZDate(date);
  const start = fixToUTC(startOfDay(now));
  const end = fixToUTC(endOfDay(now));
  return { start, end };
};
