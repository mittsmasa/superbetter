import { Android, ScriptText, Zap } from '@/assets/icons';
import { css } from '@/styled-system/css';
import Link from 'next/link';
import type { MissionItem } from '../../../db/schema/superbetter';
import { PixelBorder } from '../pixel-border';

type MissionProps = {
  id: string;
  title: string;
  items: {
    id: string;
    missionItemType: MissionItem;
    completed: boolean;
  }[];
};

export const Mission = ({ id, title, items }: MissionProps) => {
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
        <div
          className={css({
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            overflowX: 'auto',
          })}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={css({
                height: '[24px]',
                width: '[24px]',
                flexShrink: 0,
              })}
            >
              <Item key={index} {...item} />
            </div>
          ))}
        </div>
      </Link>
    </PixelBorder>
  );
};

const Item = ({
  missionItemType,
  completed,
}: MissionProps['items'][number]) => {
  switch (missionItemType) {
    case 'quest':
      return (
        <ScriptText
          className={css({ color: completed ? 'cyan.500' : 'gray.500' })}
        />
      );
    case 'powerup':
      return (
        <Zap
          className={css({ color: completed ? 'yellow.300' : 'gray.500' })}
        />
      );
    case 'villain':
      return (
        <Android
          className={css({ color: completed ? 'purple.600' : 'gray.500' })}
        />
      );
    default:
      return null;
  }
};