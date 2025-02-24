'use client';

import { Sort } from '@/assets/icons';
import { IconButton } from '@/components/icon-button';
import { css } from '@/styled-system/css';
import { useSortable, useSortableToggle } from './provider';

export const SortableButton = () => {
  const { toggleSortable } = useSortableToggle();
  const { sortable } = useSortable();
  return (
    <IconButton active={sortable} onClick={toggleSortable}>
      <Sort className={css({ width: '[24px]', height: '[24px]' })} />
    </IconButton>
  );
};
