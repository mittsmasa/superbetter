'use client';

import { useTransition } from 'react';
import { executeEpicWin } from '@/app/(private)/_actions/epicwin';
import { Button } from '@/components/button';
import { useGlassScreen } from '@/components/glass-screen';
import { useToast } from '@/components/toast';
import { css } from '@/styled-system/css';

export const ExecuteButton = ({
  epicwinId,
  archived,
}: {
  epicwinId: string;
  archived: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  useGlassScreen(isPending);
  const { add: toast } = useToast();

  if (archived) {
    return (
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '[230px]',
          py: '12px',
          textStyle: 'Body.secondary',
          color: 'cyan.700',
          bg: 'cyan.100',
          borderRadius: '8px',
          border: '1px solid {colors.cyan.300}',
        })}
      >
        ✨ 達成済み
      </div>
    );
  }

  return (
    <form
      action={async () => {
        startTransition(async () => {
          const response = await executeEpicWin({ id: epicwinId });
          if (response.type === 'error') {
            if (response.error.type === 'already-archived') {
              toast({ message: 'このエピックウィンは既に達成済みです' });
              return;
            }
            throw new Error(response.error.message);
          }
          toast({
            message: '🎉 エピックウィンを達成しました！おめでとうございます！',
          });
        });
      }}
    >
      <Button type="submit" disabled={isPending}>
        <div className={css({ width: '[230px]' })}>達成した！</div>
      </Button>
    </form>
  );
};
