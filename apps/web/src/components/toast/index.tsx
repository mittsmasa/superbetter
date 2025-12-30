'use client';

import { AnimatePresence, motion } from 'motion/react';
import {
  createContext,
  type PropsWithChildren,
  type ReactNode,
  use,
  useCallback,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { getUniqueId } from '@/app/_utils/unique-id';
import { Close } from '@/assets/icons';
import { useIsClient } from '@/hooks/check/client';
import { css, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';
import { IconButton } from '../icon-button';

type ToastProps = {
  id: string;
  message: ReactNode;
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
    }, 2_000);
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
  const isClient = useIsClient();
  if (!toasts) {
    throw new Error("Toaster can't be used outside of ToastProvider");
  }

  if (!isClient) {
    // avoid prerendering sinse this component use window
    return null;
  }
  return createPortal(
    <ol
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        left: 0,
        padding: '12px 4px',
        position: 'fixed',
        bottom: '[200px]',
        zIndex: 'toast',
      })}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </AnimatePresence>
    </ol>,
    window.document.body,
  );
};

const Toast = ({ id, message }: ToastProps) => {
  const { remove: removeToast } = use(ToastUpdateContext);
  return (
    <motion.li
      layout
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ type: 'spring', duration: 0.3 }}
      className={cx(
        pixelBorder({}),
        css({
          alignItems: 'center',
          backgroundColor: 'background',
          color: 'foreground',
          display: 'flex',
          gap: '8px',
          textStyle: 'Body.secondary',
          padding: '4px 8px',
        }),
      )}
    >
      <div>{message}</div>
      <IconButton onClick={() => removeToast(id)} size="sm">
        <Close size={20} />
      </IconButton>
    </motion.li>
  );
};

export const useToast = () => {
  const updater = use(ToastUpdateContext);
  return updater;
};
