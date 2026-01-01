'use client';

import { Button } from '@superbetter/ui';
import Image from 'next/image';
import Cat from '@/app/icon.png';
import { useIsClient } from '@/hooks/check/client';
import { css } from '@/styled-system/css';

const ErrorFallback = () => {
  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }
  return (
    <div
      className={css({
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '[100%]',
        justifyContent: 'center',
        gap: '16px',
        padding: '16px',
      })}
    >
      <p>しっぱいしちゃった...</p>
      <p>もういっかいあくせすしてみて！</p>
      <Image
        src={Cat}
        width={100}
        height={100}
        alt=""
        className={css({ borderRadius: '50%' })}
      />
      <Button onClick={() => window.location.reload()} variant="secondary">
        こうしん！
      </Button>
    </div>
  );
};

export default ErrorFallback;
