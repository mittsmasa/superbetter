import { cva } from '@/styled-system/css';
import { PixelBorder } from '../../../components/pixel-border';

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
    <PixelBorder hidden={status !== 'today'} color="colors.white">
      <div className={wrapper({ status })}>
        <p>{date}</p>
        <p>{datetime.getDate()}</p>
      </div>
    </PixelBorder>
  );
};
