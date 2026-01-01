import { token } from '../../styled-system/tokens';
import type { IconProps } from './types';

export const Minus = ({ size = 24, color }: IconProps) => {
  const colorValue = color ? token(color) : 'currentColor';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 11h16v2H4z" fill={colorValue} />
    </svg>
  );
};
