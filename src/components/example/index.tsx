import type { PropsWithChildren } from 'react';

export const ExampleButton = ({
  onClick,
  children,
}: PropsWithChildren<{ onClick: () => void }>) => {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
};
