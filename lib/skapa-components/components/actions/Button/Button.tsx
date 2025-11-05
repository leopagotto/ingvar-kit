import React from "react";
import IngkaButton from "@ingka/button";
import type { ButtonProps } from "./Button.types";
import styles from "./Button.module.css";

/**
 * Button Component - Primary action component from Skapa Design System
 * Wraps @ingka/button for official IKEA compliance
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
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      loading = false,
      disabled = false,
      fullWidth = false,
      className,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <div className={`${styles.wrapper} ${className || ""}`}>
        <IngkaButton
          ref={ref}
          type={variant as any}
          size={size === "large" ? "medium" : size}
          loading={loading}
          disabled={disabled}
          fluid={fullWidth}
          htmlType={type}
          text={children}
          className={styles.button}
          {...props}
        />
      </div>
    );
  }
);

Button.displayName = "SkapaButton";
