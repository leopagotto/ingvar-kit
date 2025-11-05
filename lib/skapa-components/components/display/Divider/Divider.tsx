import React from "react";
import type { DividerProps } from "./Divider.types";
import styles from "./Divider.module.css";

/**
 * Divider component for visual separation
 *
 * @example
 * // Basic horizontal divider
 * <Divider />
 *
 * @example
 * // Vertical divider
 * <Divider orientation="vertical" />
 *
 * @example
 * // With label
 * <Divider label="OR" />
 */
export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  (
    {
      orientation = "horizontal",
      variant = "solid",
      label,
      className,
      ...props
    },
    ref
  ) => {
    if (label && orientation === "horizontal") {
      return (
        <div
          className={`${styles.dividerWithLabel} ${styles[variant]} ${
            className || ""
          }`}
          role="separator"
        >
          <span className={styles.label}>{label}</span>
        </div>
      );
    }

    return (
      <hr
        ref={ref}
        className={`${styles.divider} ${styles[orientation]} ${
          styles[variant]
        } ${className || ""}`}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";
