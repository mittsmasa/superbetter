'use client';

import { Button } from '@/components/button';
import { css } from '@/styled-system/css';
import { useTransition } from 'react';
import { postPowerupHistory } from '../../_actions/post-powerup-history';

export const ExecuteButton = ({ powerupId }: { powerupId: string }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <form
      action={async () => {
        startTransition(async () => {
          const response = await postPowerupHistory(powerupId);
          if (response.type === 'error') {
            throw new Error(response.error.message);
          }
          //TODO: show toast
        });
      }}
    >
      <Button type="submit" disabled={isPending}>
        <div className={css({ width: '[230px]' })}>つかった！</div>
      </Button>
    </form>
  );
};
