import { css } from '../../styled-system/css';

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
          width: '[fit-content]',
          clipPath: 'inset(0 3ch 0 0)',
          animation: 'loading 1s steps(4) infinite',
          _before: {
            content: '"Loading..."',
          },
        })}
      />
    </div>
  );
};
