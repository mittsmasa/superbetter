'use client';

import { Sort } from '@/assets/icons';
import { IconButtonWithLabel } from '@/components/icon-button/with-label';
import { useSortable, useSortableToggle } from './provider';

export const SortableButton = () => {
  const { toggleSortable } = useSortableToggle();
  const { sortable } = useSortable();
  return (
    <IconButtonWithLabel
      active={sortable}
      onClick={toggleSortable}
      label="ソート"
      size="sm"
    >
      <Sort />
    </IconButtonWithLabel>
  );
};
