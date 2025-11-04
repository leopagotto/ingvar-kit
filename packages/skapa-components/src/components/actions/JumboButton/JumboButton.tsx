import React from 'react';
import clsx from 'clsx';
import type { JumboButtonProps } from './JumboButton.types';
import styles from './JumboButton.module.css';

/**
 * JumboButton Component - Large prominent call-to-action button
 * 
 * Used for high-priority actions that need extra visibility. Common in hero sections,
 * landing pages, or as primary CTAs in footers.
 * 
 * Based on: docs/ai-agents/skapa-design-system/01-ACTIONS.md
 * 
 * @example
 * ```tsx
 * <JumboButton
 *   label="Start Shopping"
 *   description="Browse 10,000+ products"
 *   icon={<ShoppingCartIcon />}
 *   onClick={handleShop}
 * />
 * 
 * <JumboButton
 *   variant="footer"
 *   label="Find a Store"
 *   description="200+ locations worldwide"
 *   icon={<LocationIcon />}
 * />
 * ```
 */
export const JumboButton = React.forwardRef<HTMLButtonElement, JumboButtonProps>(
  (
    {
      variant = 'regular',
      label,
      description,
      icon,
      loading = false,
      fullWidth = false,
      disabled = false,
      className,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const buttonClasses = clsx(
      styles.jumboButton,
      styles[variant],
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
        {icon && !loading && <span className={styles.icon}>{icon}</span>}
        <div className={styles.content}>
          <span className={styles.label}>{label}</span>
          {description && <span className={styles.description}>{description}</span>}
        </div>
      </button>
    );
  }
);

JumboButton.displayName = 'SkapaJumboButton';
