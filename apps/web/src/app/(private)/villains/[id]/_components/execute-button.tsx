'use client';

import {
  Button,
  CelebrationEffect,
  useGlassScreen,
  useToast,
} from '@superbetter/ui';
import { useTransition } from 'react';
import { postVillainHistory } from '@/app/(private)/_actions/post-villain-history';
import { useEntityFeedback } from '@/hooks/feedback';
import { css } from '@/styled-system/css';

export const ExecuteButton = ({ villainId }: { villainId: string }) => {
  const [isPending, startTransition] = useTransition();
  useGlassScreen(isPending);
  const { add: toast } = useToast();
  const { triggerFeedback, showCelebration, onCelebrationComplete, intensity } =
    useEntityFeedback('villain');

  return (
    <>
      <form
        action={async () => {
          startTransition(async () => {
            const response = await postVillainHistory(villainId);
            if (response.type === 'error') {
              throw new Error(response.error.message);
            }
            triggerFeedback();
            toast({ message: 'ヴィランとたたかった！' });
          });
        }}
      >
        <Button type="submit" disabled={isPending}>
          <div className={css({ width: '[230px]' })}>たたかった！</div>
        </Button>
      </form>
      {showCelebration && (
        <CelebrationEffect
          intensity={intensity}
          onComplete={onCelebrationComplete}
        />
      )}
    </>
  );
};
