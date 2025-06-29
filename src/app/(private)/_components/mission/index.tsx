import { CheckGradient, RadioOn } from '@/assets/icons';
import { MotionLink } from '@/components/motion-link';
import { css } from '@/styled-system/css';
import type { MissionEntity } from '../entity-icon';
import { MissionEntities } from './entitity';

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
    <MotionLink href={`/missions/${id}`}>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '[8px]',
          textStyle: 'Body.secondary',
          width: '[100%]',
        })}
      >
        <div
          className={css({
            alignItems: 'center',
            display: 'flex',
            gap: '8px',
            justifyContent: 'space-between',
          })}
        >
          <p>{title}</p>
          {completed ? (
            <CheckGradient
              className={css({ height: '[28px]', width: '[28px]' })}
            />
          ) : (
            <RadioOn
              className={css({
                color: 'entity.disabled',
                height: '[28px]',
                width: '[28px]',
              })}
            />
          )}
        </div>
        <MissionEntities items={items} />
      </div>
    </MotionLink>
  );
};
