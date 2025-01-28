'use client';

import { postQuestHistory } from '@/app/_actions/post-quest-history';
import { Button } from '@/components/button';
import { css } from '@/styled-system/css';
import { useTransition } from 'react';

export const ExecuteButton = ({ questId }: { questId: string }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <form
      action={async () => {
        startTransition(async () => {
          const response = await postQuestHistory(questId);
          if (response.type === 'error') {
            throw new Error(response.error.message);
          }
          //TODO: show toast
        });
      }}
    >
      <Button type="submit" disabled={isPending}>
        <div className={css({ width: '[230px]' })}>いどんだ！</div>
      </Button>
    </form>
  );
};
