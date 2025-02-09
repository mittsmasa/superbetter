'use client';

import { postPowerupHistory } from '@/app/_actions/post-powerup-history';
import { Button } from '@/components/button';
import { GlassScreen } from '@/components/gray-screen';
import { useToast } from '@/components/toast';
import { css } from '@/styled-system/css';
import { useTransition } from 'react';

export const ExecuteButton = ({ powerupId }: { powerupId: string }) => {
  const [isPending, startTransition] = useTransition();
  const { add: toast } = useToast();
  return (
    <>
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
      {isPending && <GlassScreen />}
    </>
  );
};
