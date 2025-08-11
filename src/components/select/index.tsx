'use client';

import {
  autoUpdate,
  FloatingFocusManager,
  FloatingPortal,
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react';
import {
  createContext,
  type PropsWithChildren,
  type ReactNode,
  use,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { css, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedValue: string | null;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  listRef: React.RefObject<Array<HTMLElement | null>>;
  getItemProps: ReturnType<typeof useInteractions>['getItemProps'];
  getReferenceProps: ReturnType<typeof useInteractions>['getReferenceProps'];
  getFloatingProps: ReturnType<typeof useInteractions>['getFloatingProps'];
  refs: ReturnType<typeof useFloating>['refs'];
  floatingStyles: ReturnType<typeof useFloating>['floatingStyles'];
  context: ReturnType<typeof useFloating>['context'];
};

const SelectContext = createContext<SelectContextValue | null>(null);

const useSelectContext = () => {
  const context = use(SelectContext);
  if (!context) {
    throw new Error('Select components must be used within Select.Root');
  }
  return context;
};

const useSelect = (
  options: SelectOption[],
  onValueChange?: (value: string) => void,
  defaultValue?: string,
) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(
    defaultValue ?? null,
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<Array<HTMLElement | null>>([]);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-start',
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      shift(),
      flip(),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
  });

  const interactions = useInteractions([click, dismiss, role, listNavigation]);

  const handleValueChange = useCallback(
    (value: string) => {
      setSelectedValue(value);
      setOpen(false);
      onValueChange?.(value);
    },
    [onValueChange],
  );

  return useMemo(
    () => ({
      open,
      setOpen,
      selectedValue,
      onValueChange: handleValueChange,
      options,
      activeIndex,
      setActiveIndex,
      listRef,
      ...interactions,
      refs,
      floatingStyles,
      context,
    }),
    [
      open,
      selectedValue,
      options,
      activeIndex,
      interactions,
      refs,
      floatingStyles,
      context,
      handleValueChange,
    ],
  );
};

export type SelectRootProps = PropsWithChildren<{
  options: SelectOption[];
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}>;

const Root = ({
  children,
  options,
  onValueChange,
  defaultValue,
}: SelectRootProps) => {
  const selectContext = useSelect(options, onValueChange, defaultValue);
  return (
    <SelectContext.Provider value={selectContext}>
      {children}
    </SelectContext.Provider>
  );
};

export type SelectTriggerProps = {
  label?: string;
  placeholder?: string;
};

const Trigger = ({
  label,
  placeholder = 'Select an option',
}: SelectTriggerProps) => {
  const { selectedValue, options, open, refs, getReferenceProps } =
    useSelectContext();

  const id = useId();
  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      })}
    >
      {label && (
        <label htmlFor={id} className={css({ textStyle: 'Body.tertiary' })}>
          {label}
        </label>
      )}
      <button
        ref={refs.setReference}
        id={id}
        {...getReferenceProps()}
        className={cx(
          pixelBorder({ borderWidth: 2, borderColor: 'interactive.border' }),
          css({
            padding: '8px',
            textStyle: 'Body.primary',
            backgroundColor: 'background',
            color: 'foreground',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '[36px]',
            _focus: {
              outline: '2px solid',
              outlineColor: 'interactive.border.alt',
              outlineOffset: '1px',
            },
          }),
        )}
      >
        <span
          className={css({
            color: selectedOption ? 'foreground' : 'foreground.secondary',
          })}
        >
          {selectedOption?.label || placeholder}
        </span>
        <span
          className={css({
            marginLeft: '[8px]',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: '[transform 0.2s]',
          })}
        >
          ▼
        </span>
      </button>
    </div>
  );
};

const Content = ({ children }: PropsWithChildren) => {
  const { open, refs, floatingStyles, getFloatingProps, context } =
    useSelectContext();

  if (!open) {
    return null;
  }

  return (
    <FloatingPortal>
      <FloatingFocusManager context={context} modal={false}>
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className={cx(
            pixelBorder({ borderWidth: 2, borderColor: 'interactive.border' }),
            css({
              backgroundColor: 'background',
              maxHeight: '[200px]',
              overflowY: 'auto',
              zIndex: 'dropdown',
            }),
          )}
        >
          {children}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
};

export type SelectItemProps = {
  value: string;
  children: ReactNode;
  disabled?: boolean;
};

const Item = ({ value, children, disabled = false }: SelectItemProps) => {
  const {
    selectedValue,
    onValueChange,
    activeIndex,
    options,
    listRef,
    getItemProps,
  } = useSelectContext();

  const index = options.findIndex((option) => option.value === value);
  const isActive = activeIndex === index;
  const isSelected = selectedValue === value;

  return (
    <div
      ref={(node) => {
        listRef.current[index] = node;
      }}
      role="option"
      tabIndex={-1}
      aria-selected={isSelected}
      {...getItemProps({
        onClick: disabled ? undefined : () => onValueChange(value),
      })}
      className={css({
        padding: '8px',
        textStyle: 'Body.primary',
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: isActive
          ? 'background.alt'
          : isSelected
            ? 'background.alt'
            : 'background',
        color: disabled
          ? 'foreground.disabled'
          : isSelected
            ? 'foreground.alt'
            : 'foreground.primary',
        _hover: disabled
          ? {}
          : {
              color: 'foreground.alt',
              backgroundColor: 'background.alt',
            },
      })}
    >
      {children}
    </div>
  );
};

export const Select = {
  Root,
  Trigger,
  Content,
  Item,
};
