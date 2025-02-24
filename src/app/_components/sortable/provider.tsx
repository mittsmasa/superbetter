'use client';

import {
  type PropsWithChildren,
  createContext,
  use,
  useCallback,
  useState,
} from 'react';

type SortableContextProps = {
  sortable: boolean;
};

const SortableContext = createContext<SortableContextProps | null>(null);

type SortableToggleContextProps = {
  toggleSortable: () => void;
};

const SortableToggleContext = createContext<SortableToggleContextProps | null>(
  null,
);

export const SortableProvider = ({ children }: PropsWithChildren) => {
  const [sortable, setSortable] = useState(false);
  const toggleSortable = useCallback(() => setSortable((prev) => !prev), []);
  return (
    <SortableContext value={{ sortable }}>
      <SortableToggleContext value={{ toggleSortable }}>
        {children}
      </SortableToggleContext>
    </SortableContext>
  );
};

export const useSortable = () => {
  const context = use(SortableContext);
  if (context === null) {
    throw new Error('useSortable must be used within a SortableProvider');
  }
  return context;
};

export const useSortableToggle = () => {
  const context = use(SortableToggleContext);
  if (context === null) {
    throw new Error('useSortableToggle must be used within a SortableProvider');
  }
  return context;
};
