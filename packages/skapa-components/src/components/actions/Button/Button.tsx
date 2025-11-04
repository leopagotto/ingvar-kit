import React from 'react';
import clsx from 'clsx';
import type { ButtonProps } from './Button.types';
import styles from './Button.module.css';

/**
 * Button Component - Primary action component from Skapa Design System
 * 
 * The Button component is used for primary user interactions. It comes in
 * multiple variants (primary, secondary, tertiary, danger) and sizes.
 * 
 * Based on: docs/ai-agents/skapa-design-system/01-ACTIONS.md
 * 
 * @example
 * ```tsx
 * // Primary button
 * <Button variant="primary" size="medium">
 *   Add to cart
 * </Button>
 * 
 * // Button with loading state
 * <Button variant="primary" loading>
 *   Processing...
 * </Button>
 * 
 * // Button with icons
 * <Button 
 *   variant="secondary" 
 *   startIcon={<CartIcon />}
 * >
 *   View Cart
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      loading = false,
      disabled = false,
      startIcon,
      endIcon,
      fullWidth = false,
      className,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const buttonClasses = clsx(
      styles.button,
      styles[variant],
      styles[size],
      {
        [styles.loading]: loading,
        [styles.fullWidth]: fullWidth,
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
        {...props}
      >
        {startIcon && !loading && (
          <span className={styles.startIcon}>{startIcon}</span>
        )}
        {children}
        {endIcon && !loading && (
          <span className={styles.endIcon}>{endIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'SkapaButton';
