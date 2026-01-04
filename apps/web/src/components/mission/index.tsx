import { MotionLink } from '@superbetter/ui';
import { CheckGradient, RadioOn } from '@/assets/icons';
import type { EntityIconProps } from '@/components/entity-icon';
import { css } from '@/styled-system/css';
import { MissionEntities } from './entitity';

export const Mission = ({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: EntityIconProps[];
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
            <CheckGradient size={28} />
          ) : (
            <RadioOn size={28} color="colors.entity.disabled" />
          )}
        </div>
        <MissionEntities items={items} />
      </div>
    </MotionLink>
  );
};
