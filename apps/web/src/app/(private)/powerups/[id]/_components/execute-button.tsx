'use client';

import {
  Button,
  CelebrationEffect,
  useGlassScreen,
  useToast,
} from '@superbetter/ui';
import { useTransition } from 'react';
import { postPowerupHistory } from '@/app/(private)/_actions/post-powerup-history';
import { useEntityFeedback } from '@/hooks/feedback';
import { css } from '@/styled-system/css';

export const ExecuteButton = ({ powerupId }: { powerupId: string }) => {
  const [isPending, startTransition] = useTransition();
  useGlassScreen(isPending);
  const { add: toast } = useToast();
  const { triggerFeedback, showCelebration, onCelebrationComplete, intensity } =
    useEntityFeedback('powerup');

  return (
    <>
      <form
        action={async () => {
          startTransition(async () => {
            const response = await postPowerupHistory(powerupId);
            if (response.type === 'error') {
              throw new Error(response.error.message);
            }
            triggerFeedback();
            toast({ message: 'パワーアップアイテムをつかった！' });
          });
        }}
      >
        <Button type="submit" disabled={isPending}>
          <div className={css({ width: '[230px]' })}>つかった！</div>
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
