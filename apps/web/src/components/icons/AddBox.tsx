import { token } from '@/styled-system/tokens';
import type { IconProps } from './types';

export const AddBox = ({ size = 24, color }: IconProps) => {
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
        d="M3 3h18v18H3V3zm16 16V5H5v14h14zm-6-8h4v2h-4v4h-2v-4H7v-2h4V7h2v4z"
        fill={colorValue}
      />
    </svg>
  );
};
