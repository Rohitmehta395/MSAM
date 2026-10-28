'use client';

import React, {
  createContext,
  useContext,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { cn } from '@/lib/cn';

export type TabsActivationMode = 'automatic' | 'manual';
export type TabsVariant = 'underline';

interface TabsContextValue {
  tabsId: string;
  value: string;
  setValue: (value: string) => void;
  activation: TabsActivationMode;
  variant: TabsVariant;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs subcomponents must be rendered within a <Tabs> container.');
  }
  return context;
}

export interface TabsProps {
  /** Unique ID for associating tabs with panels. Generated automatically if omitted */
  id?: string;
  /** Controlled active tab value */
  value?: string;
  /** Default active tab value for uncontrolled usage */
  defaultValue?: string;
  /** Callback fired when the active tab value changes */
  onValueChange?: (value: string) => void;
  /**
   * Keyboard activation model:
   * - 'automatic' (default): Moving focus with Arrow keys immediately activates the tab.
   * - 'manual': Arrow keys move focus, while Space or Enter activates the focused tab.
   */
  activation?: TabsActivationMode;
  /** Visual presentation variant. Default: 'underline' */
  variant?: TabsVariant;
  /** Optional custom class name */
  className?: string;
  /** Tabs children */
  children: React.ReactNode;
}

/**
 * Accessible ARIA Tabs container supporting controlled and uncontrolled state,
 * automatic and manual keyboard activation, and roving tabIndex.
 */
export function Tabs({
  id: explicitId,
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  activation = 'automatic',
  variant = 'underline',
  className,
  children,
}: TabsProps) {
  const generatedId = useId();
  const tabsId = explicitId || generatedId;

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string>(defaultValue);
  const activeValue = isControlled ? controlledValue : internalValue;

  const setValue = (val: string) => {
    if (!isControlled) {
      setInternalValue(val);
    }
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider
      value={{
        tabsId,
        value: activeValue,
        setValue,
        activation,
        variant,
      }}
    >
      <div className={cn('flex flex-col', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accessible label describing the purpose of the tablist */
  'aria-label'?: string;
  /** Optional custom class name */
  className?: string;
  /** Tabs triggers */
  children: React.ReactNode;
}

/**
 * Horizontal tablist container with accessible overflow scrolling on narrow viewports.
 */
export function TabsList({
  'aria-label': ariaLabel,
  className,
  children,
  ...props
}: TabsListProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn('border-border flex w-full scrollbar-none overflow-x-auto border-b', className)}
      {...props}
    >
      <div className="flex min-w-max items-center gap-6">{children}</div>
    </div>
  );
}

export interface TabsTriggerProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'value'
> {
  /** Value identifying this tab */
  value: string;
  /** Optional leading icon component */
  icon?: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  /** Whether this tab is disabled */
  disabled?: boolean;
  /** Optional custom class name */
  className?: string;
  /** Tab label */
  children: React.ReactNode;
}

/**
 * Interactive tab trigger supporting roving tabIndex, keyboard navigation, and gold underline styling.
 */
export function TabsTrigger({
  value,
  icon: Icon,
  disabled = false,
  className,
  children,
  ...props
}: TabsTriggerProps) {
  const { tabsId, value: activeValue, setValue, activation } = useTabsContext();
  const isSelected = activeValue === value;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const tabId = `${tabsId}-tab-${value}`;
  const panelId = `${tabsId}-panel-${value}`;

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const listElement = buttonRef.current?.closest('[role="tablist"]');
    if (!listElement) return;

    const tabs = Array.from(
      listElement.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
    );
    const currentIndex = tabs.indexOf(buttonRef.current as HTMLButtonElement);
    if (currentIndex === -1) return;

    let targetIndex = currentIndex;

    switch (event.key) {
      case 'ArrowRight':
        targetIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        targetIndex = 0;
        break;
      case 'End':
        targetIndex = tabs.length - 1;
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        setValue(value);
        return;
      default:
        return;
    }

    event.preventDefault();
    const targetTab = tabs[targetIndex];
    if (targetTab) {
      targetTab.focus();
      if (activation === 'automatic') {
        targetTab.click();
      }
    }
  };

  return (
    <button
      ref={buttonRef}
      id={tabId}
      role="tab"
      type="button"
      disabled={disabled}
      aria-selected={isSelected}
      aria-controls={panelId}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => setValue(value)}
      onKeyDown={handleKeyDown}
      className={cn(
        'group inline-flex items-center gap-2 pt-2 pb-3.5 text-base whitespace-nowrap transition-colors select-none',
        '-mb-[1px] border-b-2',
        'focus-visible:outline-navy focus-visible:outline-2 focus-visible:outline-offset-2',
        isSelected
          ? 'border-gold text-navy font-bold'
          : 'text-navy/70 hover:border-navy/20 hover:text-navy border-transparent font-medium',
        disabled && 'cursor-not-allowed opacity-40',
        className,
      )}
      {...props}
    >
      {Icon && (
        <Icon
          className={cn(
            'h-4 w-4 shrink-0 transition-colors',
            isSelected ? 'text-navy' : 'text-navy/70 group-hover:text-navy',
          )}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </button>
  );
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Value matching the corresponding TabsTrigger */
  value: string;
  /** Optional custom class name */
  className?: string;
  /** Content of the tab panel */
  children: React.ReactNode;
}

/**
 * Content container rendered for an active tab panel.
 */
export function TabsContent({ value, className, children, ...props }: TabsContentProps) {
  const { tabsId, value: activeValue } = useTabsContext();
  const isSelected = activeValue === value;

  const tabId = `${tabsId}-tab-${value}`;
  const panelId = `${tabsId}-panel-${value}`;

  if (!isSelected) {
    return null;
  }

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      tabIndex={0}
      className={cn(
        'focus-visible:outline-navy pt-6 focus-visible:outline-2 focus-visible:outline-offset-2',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
