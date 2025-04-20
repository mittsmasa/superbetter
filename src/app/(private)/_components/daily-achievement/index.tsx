import { getDateTimeFormat } from '@/app/_utils/date';
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

export const DailyAchievement = ({
  date: _date,
  status,
  isToday,
}: DailyAchievements) => {
  const { day, date } = getDateTimeFormat(_date);

  return (
    <div
      className={cx(
        wrapper({ status }),
        isToday && pixelBorder({ borderColor: 'interactive.border.alt' }),
      )}
    >
      <p>{day}</p>
      <p>{date}</p>
    </div>
  );
};
