import { MotionLink } from '@/components/motion-link';
import { css } from '@/styled-system/css';
import type { ComponentProps } from 'react';

export const EntityLink = ({
  href,
  title,
  description,
}: {
  href: ComponentProps<typeof MotionLink>['href'];
  title: string;
  description?: string | null;
}) => {
  return (
    <MotionLink href={href}>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '4px',
        })}
      >
        <p>{title}</p>
        {description && (
          <p
            className={css({
              color: 'gray.200',
              textStyle: 'Body.tertiary',
              lineClamp: 3,
            })}
          >
            {description}
          </p>
        )}
      </div>
    </MotionLink>
  );
};
