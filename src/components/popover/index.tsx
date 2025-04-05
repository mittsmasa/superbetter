'use client';

import {
  autoUpdate,
  FloatingFocusManager,
  FloatingPortal,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import {
  createContext,
  type PropsWithChildren,
  type ReactElement,
  use,
  useMemo,
  useState,
} from 'react';

const usePopover = () => {
  const [open, setOpen] = useState(false);
  const data = useFloating({
    placement: 'bottom-end',
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(10), shift(), flip()],
  });
  const context = data.context;

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);
  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
    }),
    [open, interactions, data],
  );
};

const PopoverContext = createContext<ReturnType<typeof usePopover> | null>(
  null,
);

const usePopoverContext = () => {
  const context = use(PopoverContext);
  if (!context) {
    throw new Error('PopoverContext not found');
  }
  return context;
};

export const Root = (props: PropsWithChildren) => {
  const context = usePopover();
  return (
    <PopoverContext.Provider value={context}>
      {props.children}
    </PopoverContext.Provider>
  );
};

type RenderItemProps = ReturnType<typeof usePopoverContext>;

const Trigger = ({
  renderItem,
}: {
  renderItem: (props: ReturnType<typeof usePopoverContext>) => ReactElement;
}) => {
  const context = usePopoverContext();
  return renderItem(context);
};

const Content = ({
  renderItem,
}: {
  renderItem: (props: RenderItemProps) => ReactElement;
}) => {
  const ctx = usePopoverContext();

  if (!ctx.open) {
    return null;
  }

  return (
    <FloatingPortal>
      <FloatingFocusManager context={ctx.context} modal={false}>
        {renderItem(ctx)}
      </FloatingFocusManager>
    </FloatingPortal>
  );
};

export const Popover = {
  Root,
  Trigger,
  Content,
};
