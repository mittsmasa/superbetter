import { useCallback, useRef } from 'react';

export const useDialog = () => {
  const ref = useRef<HTMLDialogElement | null>(null);
  const show = useCallback(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, []);

  const close = useCallback(() => {
    if (ref.current) {
      ref.current.close();
    }
  }, []);
  return { ref, show, close };
};
