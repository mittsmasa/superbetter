'use client';

import { IconButtonWithLabel } from '@superbetter/ui';
import { Sort } from '@/assets/icons';
import { useSortable, useSortableToggle } from './provider';

export const SortableButton = () => {
  const { toggleSortable } = useSortableToggle();
  const { sortable } = useSortable();
  return (
    <IconButtonWithLabel
      active={sortable}
      onClick={toggleSortable}
      label="ソート"
      size="md"
    >
      <Sort />
    </IconButtonWithLabel>
  );
};
