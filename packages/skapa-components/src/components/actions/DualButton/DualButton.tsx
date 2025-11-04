import React from 'react';
import clsx from 'clsx';
import type { DualButtonProps } from './DualButton.types';
import styles from './DualButton.module.css';

/**
 * DualButton Component - Combined button pair for related actions
 * 
 * Used for presenting two closely related actions together (e.g., "Add to Cart" + "Buy Now").
 * Commonly seen in e-commerce for primary and alternative purchase paths.
 * 
 * Based on: docs/ai-agents/skapa-design-system/01-ACTIONS.md
 * 
 * @example
 * ```tsx
 * <DualButton
 *   primaryLabel="Add to cart"
 *   secondaryLabel="Buy now"
 *   onPrimaryClick={handleAddToCart}
 *   onSecondaryClick={handleBuyNow}
 * />
 * ```
 */
export const DualButton: React.FC<DualButtonProps> = ({
  variant = 'default',
  size = 'medium',
  primaryLabel,
  secondaryLabel,
  onPrimaryClick,
  onSecondaryClick,
  disabled = false,
  primaryIcon,
  secondaryIcon,
  className,
}) => {
  const containerClasses = clsx(
    styles.dualButton,
    styles[variant],
    styles[size],
    className
  );

  return (
    <div className={containerClasses} role="group">
      <button
        type="button"
        className={styles.primary}
        onClick={onPrimaryClick}
        disabled={disabled}
        aria-label={primaryLabel}
      >
        {primaryIcon && <span className={styles.icon}>{primaryIcon}</span>}
        {primaryLabel}
      </button>
      <button
        type="button"
        className={styles.secondary}
        onClick={onSecondaryClick}
        disabled={disabled}
        aria-label={secondaryLabel}
      >
        {secondaryIcon && <span className={styles.icon}>{secondaryIcon}</span>}
        {secondaryLabel}
      </button>
    </div>
  );
};

DualButton.displayName = 'SkappaDualButton';
