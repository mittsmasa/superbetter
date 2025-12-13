import { getStartAndEndOfDay } from '@/app/_utils/date';

export const isEditableDate = (targetDate: Date): boolean => {
  const now = new Date();
  const today = getStartAndEndOfDay(now);
  const yesterday = getStartAndEndOfDay(
    new Date(now.getTime() - 24 * 60 * 60 * 1000),
  );
  const target = getStartAndEndOfDay(targetDate);

  return (
    (target.start >= today.start && target.end <= today.end) ||
    (target.start >= yesterday.start && target.end <= yesterday.end)
  );
};
