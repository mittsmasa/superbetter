import Link from 'next/link';
import { getDateTimeFormat, getTZDate } from '@/app/_utils/date';
import type { DailyAchievements } from '@/app/(private)/_actions/types/weekly-achievements';
import { cva, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';

const wrapper = cva({
  base: {
    alignItems: 'center',
    backgroundColor: 'background',
    color: 'foreground',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '[30px]',
  },
  variants: {
    status: {
      'no-data': {
        color: 'foreground.disabled',
      },
      achieved: {
        color: 'background',
        backgroundColor: 'foreground',
      },
      'not-achieved': {},
      today: {},
    },
  },
});

const formatDateForUrl = (date: Date) => {
  const jstDate = getTZDate(date);
  const year = jstDate.getFullYear();
  const month = String(jstDate.getMonth() + 1).padStart(2, '0');
  const day = String(jstDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const DailyAchievement = ({
  date: _date,
  status,
  isToday,
}: DailyAchievements) => {
  const { day, date } = getDateTimeFormat(_date);
  const dateForUrl = formatDateForUrl(_date);

  return (
    <Link href={`/history/${dateForUrl}`}>
      <div
        className={cx(
          wrapper({ status }),
          isToday && pixelBorder({ borderColor: 'interactive.border.alt' }),
        )}
      >
        <p>{day}</p>
        <p>{date}</p>
      </div>
    </Link>
  );
};
