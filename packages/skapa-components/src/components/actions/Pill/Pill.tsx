import React from 'react';
import clsx from 'clsx';
import type { PillProps } from './Pill.types';
import styles from './Pill.module.css';

/**
 * Pill Component - Compact button for filters, tags, and badges
 *
 * Pills are used in filtering interfaces, tag selections, and as status badges.
 * The active state indicates selection in filter contexts.
 *
 * Based on: docs/ai-agents/skapa-design-system/09-DESIGN-PATTERNS.md (Filtering Pattern)
 *
 * @example
 * ```tsx
 * // Filter pills (e-commerce)
 * <Pill variant="filter" active>All</Pill>
 * <Pill variant="filter">Living Room</Pill>
 * <Pill variant="filter">Bedroom</Pill>
 *
 * // Dismissible tag
 * <Pill
 *   variant="tag"
 *   endIcon={<CloseIcon />}
 *   onEndIconClick={() => removeTag()}
 * >
 *   React
 * </Pill>
 * ```
 */
export const Pill = React.forwardRef<HTMLButtonElement, PillProps>(
  (
    {
      variant = 'filter',
      size = 'medium',
      active = false,
      icon,
      endIcon,
      onEndIconClick,
      disabled = false,
      className,
      children,
      type = 'button',
      onClick,
      ...props
    },
    ref
  ) => {
    const pillClasses = clsx(
      styles.pill,
      styles[variant],
      styles[size],
      {
        [styles.active]: active,
      },
      className
    );

    const handleEndIconClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onEndIconClick?.(e);
    };

    return (
      <button
        ref={ref}
        type={type}
        className={pillClasses}
        disabled={disabled}
        aria-pressed={variant === 'filter' ? active : undefined}
        onClick={onClick}
        {...props}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
        {endIcon && (
          <span
            className={styles.endIcon}
            onClick={handleEndIconClick}
            role="button"
            tabIndex={-1}
          >
            {endIcon}
          </span>
        )}
      </button>
    );
  }
);

Pill.displayName = 'SkapaPill';
