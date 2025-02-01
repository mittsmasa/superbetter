'use client';

import { postVillainHistory } from '@/app/_actions/post-villain-history';
import { Button } from '@/components/button';
import { GlassScreen } from '@/components/gray-screen';
import { css } from '@/styled-system/css';
import { useTransition } from 'react';

export const ExecuteButton = ({ villainId }: { villainId: string }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <form
        action={async () => {
          startTransition(async () => {
            const response = await postVillainHistory(villainId);
            if (response.type === 'error') {
              throw new Error(response.error.message);
            }
            //TODO: show toast
          });
        }}
      >
        <Button type="submit" disabled={isPending}>
          <div className={css({ width: '[230px]' })}>たたかった！</div>
        </Button>
      </form>
      {isPending && <GlassScreen />}
    </>
  );
};
