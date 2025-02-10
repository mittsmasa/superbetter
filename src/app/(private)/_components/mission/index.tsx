import { MotionLink } from '@/components/motion-link';
import { css, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';
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
  return (
    <MotionLink href={`/missions/${id}`} className={cx(pixelBorder({}))}>
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
        <p>{title}</p>
        <MissionEntities items={items} />
      </div>
    </MotionLink>
  );
};
