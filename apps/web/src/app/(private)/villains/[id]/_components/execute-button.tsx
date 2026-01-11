'use client';

import {
  Button,
  useGlassScreen,
  useToast,
  useVibration,
} from '@superbetter/ui';
import { useTransition } from 'react';
import { postVillainHistory } from '@/app/(private)/_actions/post-villain-history';
import { css } from '@/styled-system/css';

export const ExecuteButton = ({ villainId }: { villainId: string }) => {
  const [isPending, startTransition] = useTransition();
  useGlassScreen(isPending);
  const { add: toast } = useToast();
  const { vibrate } = useVibration();

  return (
    <form
      action={async () => {
        startTransition(async () => {
          const response = await postVillainHistory(villainId);
          if (response.type === 'error') {
            throw new Error(response.error.message);
          }
          vibrate([100, 50, 100, 50, 150]);
          toast({ message: 'ヴィランとたたかった！' });
        });
      }}
    >
      <Button type="submit" disabled={isPending}>
        <div className={css({ width: '[230px]' })}>たたかった！</div>
      </Button>
    </form>
  );
};
