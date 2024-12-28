import { Android, Calendar, Human, ScriptText, Zap } from '@/assets/icons';
import { css } from '@/styled-system/css';
import { IconButton } from './icon-button';

export const FooterNavigation = () => {
  return (
    <div
      className={css({
        alignItems: 'center',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '4px 12px',
      })}
    >
      <IconButton type="button" active>
        <Calendar />
      </IconButton>
      <IconButton type="button">
        <Zap />
      </IconButton>
      <IconButton type="button">
        <ScriptText />
      </IconButton>
      <IconButton type="button">
        <Android />
      </IconButton>
      <IconButton type="button">
        <Human />
      </IconButton>
    </div>
  );
};
