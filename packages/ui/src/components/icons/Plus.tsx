import { token } from '../../styled-system/tokens';
import type { IconProps } from './types';

export const Plus = ({ size = 24, color }: IconProps) => {
  const colorValue = color ? token(color) : 'currentColor';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11 4h2v7h7v2h-7v7h-2v-7H4v-2h7V4z" fill={colorValue} />
    </svg>
  );
};
