'use client';

import { postQuestHistory } from '@/app/(private)/_actions/post-quest-history';
import { Button } from '@/components/button';
import { useGlassScreen } from '@/components/glass-screen';
import { useToast } from '@/components/toast';
import { css } from '@/styled-system/css';
import { useTransition } from 'react';

export const ExecuteButton = ({ questId }: { questId: string }) => {
  const [isPending, startTransition] = useTransition();
  const screen = useGlassScreen();
  const { add: toast } = useToast();
  return (
    <>
      <form
        action={async () => {
          startTransition(async () => {
            screen.show();
            const response = await postQuestHistory(questId);
            screen.hide();
            if (response.type === 'error') {
              throw new Error(response.error.message);
            }
            toast({ message: 'クエストにいどんだ！' });
          });
        }}
      >
        <Button type="submit" disabled={isPending}>
          <div className={css({ width: '[230px]' })}>いどんだ！</div>
        </Button>
      </form>
    </>
  );
};
