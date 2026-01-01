import { token } from '../../styled-system/tokens';
import type { IconProps } from './types';

export const CheckGradient = ({ size = 24, color }: IconProps) => {
  const colorValue = color ? token(color) : 'currentColor';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.75 2.75H5.25V4.25H3.75V5.75H2.25V13.25H3.75V14.75H5.25V16.25H12.75V14.75H14.25V13.25H15.75V5.75H14.25V4.25H12.75V2.75ZM12.75 4.25V5.75H14.25V13.25H12.75V14.75H5.25V13.25H3.75V5.75H5.25V4.25H12.75ZM6.00018 8.75H7.50018V10.25L9 10.25V11.75H7.5V10.25L6.00018 10.25V8.75ZM12.0002 7.25H10.5002V8.75H9.00018V10.25H10.5002V8.75H12.0002V7.25Z"
        data-figma-gradient-fill={colorValue}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.75 2.75H5.25V4.25H3.75V5.75H2.25V13.25H3.75V14.75H5.25V16.25H12.75V14.75H14.25V13.25H15.75V5.75H14.25V4.25H12.75V2.75ZM12.75 4.25V5.75H14.25V13.25H12.75V14.75H5.25V13.25H3.75V5.75H5.25V4.25H12.75ZM6.00018 8.75H7.50018V10.25L9 10.25V11.75H7.5V10.25L6.00018 10.25V8.75ZM12.0002 7.25H10.5002V8.75H9.00018V10.25H10.5002V8.75H12.0002V7.25Z"
        fill={colorValue}
      />
    </svg>
  );
};
