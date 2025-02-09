'use client';

import { getUniqueId } from '@/app/_utils/unique-id';
import { css } from '@/styled-system/css';
import {
  type PropsWithChildren,
  createContext,
  use,
  useCallback,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

type ToastProps = {
  id: string;
  message: string;
  type?: 'success';
};

type ToastInput = Omit<ToastProps, 'id'>;

const ToastContext = createContext<ToastProps[] | null>(null);

const ToastUpdateContext = createContext<{
  add: (props: ToastInput) => void;
  remove: (id: string) => void;
}>({
  add: () => {
    throw new Error('ToastUpdateContext not initialized');
  },
  remove: () => {
    throw new Error('ToastUpdateContext not initialized');
  },
});

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const addToast = useCallback((props: ToastInput) => {
    const id = getUniqueId();
    setToasts((prev) => [...prev, { id, ...props }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5_000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext value={toasts}>
      <ToastUpdateContext value={{ add: addToast, remove: removeToast }}>
        {children}
      </ToastUpdateContext>
    </ToastContext>
  );
};

export const Toaster = () => {
  const toasts = use(ToastContext);
  if (!toasts) {
    throw new Error("Toaster can't be used outside of ToastProvider");
  }
  return createPortal(
    <ol
      className={css({
        zIndex: 'toast',
        position: 'fixed',
        bottom: 0,
        left: 0,
        padding: '12px 4px',
      })}
    >
      {toasts.map((toast) => (
        <li
          key={toast.id}
          className={css({
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: 'black',
            color: 'white',
          })}
        >
          {toast.message}
        </li>
      ))}
    </ol>,
    document.body,
  );
};

const Toast = () => {};

export const useToast = () => {
  const updater = use(ToastUpdateContext);
  return updater;
};
