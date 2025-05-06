import { Android, ScriptText, Zap } from '@/assets/icons';
import { neonCurrentColor } from '@/assets/style';
import type { EntityType } from '@/db/types/mission';
import { css } from '@/styled-system/css';

export type MissionEntity = {
  id: string;
  itemType: EntityType;
  completed: boolean;
};

export const EntityIcon = ({ itemType, completed }: MissionEntity) => {
  switch (itemType) {
    case 'quest':
      return (
        <ScriptText
          className={css(
            {
              color: completed ? 'entity.quest' : 'entity.disabled',
              transition: '[color 0.8s ease-in-out]',
            },
            completed && neonCurrentColor,
          )}
        />
      );
    case 'powerup':
      return (
        <Zap
          className={css(
            {
              color: completed ? 'entity.powerup' : 'entity.disabled',
              transition: '[color 0.8s ease-in-out]',
            },
            completed && neonCurrentColor,
          )}
        />
      );
    case 'villain':
      return (
        <Android
          className={css(
            {
              color: completed ? 'entity.villain' : 'entity.disabled',
              transition: '[color 0.8s ease-in-out]',
            },
            completed && neonCurrentColor,
          )}
        />
      );
    default:
      return null;
  }
};
