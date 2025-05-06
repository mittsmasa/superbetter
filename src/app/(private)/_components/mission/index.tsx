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
              className={css({ width: '[28px]', height: '[28px]' })}
            />
          ) : (
            <RadioOn
              className={css({
                width: '[28px]',
                height: '[28px]',
                color: 'entity.disabled',
              })}
            />
          )}
        </div>
        <MissionEntities items={items} />
      </div>
    </MotionLink>
  );
};
