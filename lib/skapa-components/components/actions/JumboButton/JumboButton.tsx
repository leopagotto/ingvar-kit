import React from "react";
import IngkaJumboButton from "@ingka/jumbo-button";
import type { JumboButtonProps } from "./JumboButton.types";
import styles from "./JumboButton.module.css";

/**
 * JumboButton Component - Large prominent call-to-action button
 * Wraps @ingka/jumbo-button for official IKEA compliance
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
 *   onClick={handleShop}
 * />
 * ```
 */
export const JumboButton: React.FC<JumboButtonProps> = ({
  variant = "regular",
  label,
  description,
  loading = false,
  disabled = false,
  className,
  type = "button",
  onClick,
  ...props
}) => {
  // Filter out incompatible props
  const { icon, fullWidth, ...compatibleProps } = props as any;

  return (
    <div className={`${styles.wrapper} ${className || ""}`}>
      <IngkaJumboButton
        label={label}
        htmlType={type}
        loading={loading}
        disabled={disabled}
        footer={variant === "footer"}
        onClick={onClick as any}
        className={styles.jumboButton}
        {...compatibleProps}
      >
        {description && (
          <span className={styles.description}>{description}</span>
        )}
      </IngkaJumboButton>
    </div>
  );
};
