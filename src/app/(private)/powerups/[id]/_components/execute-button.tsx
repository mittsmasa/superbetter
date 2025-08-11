'use client';

import { useTransition } from 'react';
import { postPowerupHistory } from '@/app/(private)/_actions/post-powerup-history';
import { Button } from '@/components/button';
import { useGlassScreen } from '@/components/glass-screen';
import { useToast } from '@/components/toast';
import { css } from '@/styled-system/css';

export const ExecuteButton = ({ powerupId }: { powerupId: string }) => {
  const [isPending, startTransition] = useTransition();
  useGlassScreen(isPending);
  const { add: toast } = useToast();
  return (
    <form
      action={async () => {
        startTransition(async () => {
          const response = await postPowerupHistory(powerupId);
          if (response.type === 'error') {
            throw new Error(response.error.message);
          }
          toast({ message: 'パワーアップアイテムをつかった！' });
        });
      }}
    >
      <Button type="submit" disabled={isPending}>
        <div className={css({ width: '[230px]' })}>つかった！</div>
      </Button>
    </form>
  );
};
