import { Android, ScriptText, Zap } from '@/assets/icons';
import { css } from '@/styled-system/css';
import type { MissionItem } from '../../../../../types/mission';

export const MissionEntities = (props: { items: MissionEntity[] }) => {
  return (
    <div
      className={css({
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        overflowX: 'auto',
      })}
    >
      {props.items.map((item, index) => (
        <div
          key={index}
          className={css({
            height: '[24px]',
            width: '[24px]',
            flexShrink: 0,
          })}
        >
          <MissionEntity key={index} {...item} />
        </div>
      ))}
    </div>
  );
};

export type MissionEntity = {
  id: string;
  missionItemType: MissionItem;
  completed: boolean;
};

const MissionEntity = ({ missionItemType, completed }: MissionEntity) => {
  switch (missionItemType) {
    case 'quest':
      return (
        <ScriptText
          className={css({
            color: completed ? 'cyan.500' : 'gray.500',
            transition: '[color 0.8s ease-in-out]',
          })}
        />
      );
    case 'powerup':
      return (
        <Zap
          className={css({
            color: completed ? 'yellow.300' : 'gray.500',
            transition: '[color 0.8s ease-in-out]',
          })}
        />
      );
    case 'villain':
      return (
        <Android
          className={css({
            color: completed ? 'purple.600' : 'gray.500',
            transition: '[color 0.8s ease-in-out]',
          })}
        />
      );
    default:
      return null;
  }
};
