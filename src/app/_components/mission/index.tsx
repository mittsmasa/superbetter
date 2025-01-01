import { PixelBorder } from '@/components/pixel-border';
import { css } from '@/styled-system/css';
import Link from 'next/link';
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
    <PixelBorder width="[100%]">
      <Link
        href={`/missions/${id}`}
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
      </Link>
    </PixelBorder>
  );
};
