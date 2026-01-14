'use client';

import { IconButton, useToast } from '@superbetter/ui';
import { AddBox } from '@superbetter/ui/icons';
import { useTransition } from 'react';
import type { EntityType } from '@/types/superbetter';

type ExecuteResult =
  | { type: 'ok' }
  | { type: 'error'; error: { message: string } };

type QuickExecuteButtonProps = {
  entityType: Exclude<EntityType, 'epicwin'>;
  onExecute: () => Promise<ExecuteResult>;
  onComplete?: () => void;
};

const messages: Record<Exclude<EntityType, 'epicwin'>, string> = {
  quest: 'クエストにいどんだ！',
  powerup: 'パワーアップアイテムをつかった！',
  villain: 'ヴィランとたたかった！',
};

export const QuickExecuteButton = ({
  entityType,
  onExecute,
  onComplete,
}: QuickExecuteButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const { add: toast } = useToast();

  const handleExecute = (e: React.MouseEvent) => {
    e.stopPropagation();
    startTransition(async () => {
      const result = await onExecute();

      if (result?.type === 'error') {
        toast({ message: result.error.message });
        return;
      }
      toast({ message: messages[entityType] });
      onComplete?.();
    });
  };

  return (
    <IconButton onClick={handleExecute} disabled={isPending} size="md" active>
      <AddBox size={24} />
    </IconButton>
  );
};
