import { css } from '@/styled-system/css';

export const Loading = () => {
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        padding: '12px',
      })}
    >
      <div
        className={css({
          _before: {
            content: '"Loading..."',
          },
          animation: 'loading 1s steps(4) infinite',
          clipPath: 'inset(0 3ch 0 0)',
          width: '[fit-content]',
        })}
      />
    </div>
  );
};
