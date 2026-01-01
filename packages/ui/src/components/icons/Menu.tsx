import { token } from '../../styled-system/tokens';
import type { IconProps } from './types';

export const Menu = ({ size = 24, color }: IconProps) => {
  const colorValue = color ? token(color) : 'currentColor';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 5H4v2h16v-2z"
        fill={colorValue}
      />
    </svg>
  );
};
