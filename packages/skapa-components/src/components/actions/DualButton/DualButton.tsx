import React from "react";
import IngkaDualButton from "@ingka/dual-button";
import type { DualButtonProps } from "./DualButton.types";
import styles from "./DualButton.module.css";

/**
 * DualButton Component - Combined button pair for related actions
 * Wraps @ingka/dual-button for official IKEA compliance
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
  size = "medium",
  primaryLabel,
  secondaryLabel,
  onPrimaryClick,
  onSecondaryClick,
  disabled = false,
  className,
}) => {
  return (
    <div className={`${styles.wrapper} ${className || ""}`}>
      <IngkaDualButton
        firstText={primaryLabel}
        secondText={secondaryLabel}
        onClickFirst={onPrimaryClick}
        onClickSecond={onSecondaryClick}
        disabledFirst={disabled}
        disabledSecond={disabled}
        small={size !== "large"}
        orientation="horizontal"
        className={styles.dualButton}
      />
    </div>
  );
};

DualButton.displayName = "SkappaDualButton";
