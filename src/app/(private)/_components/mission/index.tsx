import { CheckGradient, RadioOn } from '@/assets/icons';
import { MotionLink } from '@/components/motion-link';
import { css } from '@/styled-system/css';
import { MissionEntities, type MissionEntity } from './entitity';

export const Mission = ({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: MissionEntity[];
}) => {
  const completed = items.every((item) => item.completed);
  return (
    <MotionLink href={`/missions/${id}`} pixelBorderWidth={2}>
      <div
        className={css({
          textStyle: 'Body.secondary',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '[8px]',
          width: '[100%]',
        })}
      >
        <div
          className={css({
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '8px',
          })}
        >
          <p>{title}</p>
          {completed ? (
            <CheckGradient
              className={css({ width: '[32px]', height: '[32px]' })}
            />
          ) : (
            <RadioOn
              className={css({
                width: '[32px]',
                height: '[32px]',
                color: 'foreground.disabled',
              })}
            />
          )}
        </div>
        <MissionEntities items={items} />
      </div>
    </MotionLink>
  );
};
