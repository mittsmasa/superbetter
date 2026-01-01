'use client';

import { Button, useGlassScreen, useToast } from '@superbetter/ui';
import { useTransition } from 'react';
import { postQuestHistory } from '@/app/(private)/_actions/post-quest-history';
import { css } from '@/styled-system/css';

export const ExecuteButton = ({ questId }: { questId: string }) => {
  const [isPending, startTransition] = useTransition();
  useGlassScreen(isPending);
  const { add: toast } = useToast();
  return (
    <form
      action={async () => {
        startTransition(async () => {
          const response = await postQuestHistory(questId);
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
  );
};
