import { css } from '@/styled-system/css';

export const DailyAchievement = ({
  datetime,
  status,
}: {
  datetime: Date;
  status: 'upcoming' | 'achieved' | 'not-achieved' | 'today';
}) => {
  const date = new Intl.DateTimeFormat('ja-JP', { weekday: 'short' }).format(
    datetime,
  );
  return (
    <div
      className={css({
        alignItems: 'center',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '[30px]',
      })}
    >
      <p>{date}</p>
      <p>{datetime.getDate()}</p>
    </div>
  );
};
