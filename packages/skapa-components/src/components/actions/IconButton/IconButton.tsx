import React from 'react';
import clsx from 'clsx';
import type { IconButtonProps } from './IconButton.types';
import styles from './IconButton.module.css';

/**
 * IconButton Component - Compact action button with icon only
 * 
 * Icon buttons are used for common actions where space is limited.
 * Always provide an accessible label for screen readers.
 * 
 * Based on: docs/ai-agents/skapa-design-system/01-ACTIONS.md
 * 
 * @example
 * ```tsx
 * // Basic icon button
 * <IconButton 
 *   icon={<HeartIcon />} 
 *   aria-label="Add to favorites"
 * />
 * 
 * // Active state (e.g., favorited)
 * <IconButton 
 *   icon={<HeartIcon />} 
 *   aria-label="Remove from favorites"
 *   active
 * />
 * ```
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      icon,
      loading = false,
      active = false,
      disabled = false,
      className,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const buttonClasses = clsx(
      styles.iconButton,
      styles[variant],
      styles[size],
      {
        [styles.loading]: loading,
        [styles.active]: active,
      },
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        aria-busy={loading}
        aria-disabled={disabled || loading}
        aria-pressed={active}
        {...props}
      >
        <span className={styles.icon}>{icon}</span>
      </button>
    );
  }
);

IconButton.displayName = 'SkapaIconButton';
