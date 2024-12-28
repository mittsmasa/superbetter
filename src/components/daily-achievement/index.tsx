import { cva } from '@/styled-system/css';

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
      today: {
        boxShadow:
          '-2px 0 0 0 currentColor, 2px 0 0 0 currentColor, 0 -2px 0 0 currentColor, 0 2px 0 0 currentColor',
      },
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
    <div className={wrapper({ status })}>
      <p>{date}</p>
      <p>{datetime.getDate()}</p>
    </div>
  );
};
