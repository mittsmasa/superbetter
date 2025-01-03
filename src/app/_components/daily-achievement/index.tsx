import { cva, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';

const wrapper = cva({
  base: {
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '[30px]',
  },
  variants: {
    status: {
      upcoming: {
        color: 'gray.300',
      },
      achieved: {
        color: 'black',
        backgroundColor: 'white',
      },
      'not-achieved': {},
      today: {},
    },
  },
});

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
      className={cx(wrapper({ status }), status === 'today' && pixelBorder({}))}
    >
      <p>{date}</p>
      <p>{datetime.getDate()}</p>
    </div>
  );
};
