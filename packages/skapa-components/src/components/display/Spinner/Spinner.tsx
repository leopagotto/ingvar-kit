import React from "react";
import type { SpinnerProps } from "./Spinner.types";
import styles from "./Spinner.module.css";

/**
 * Spinner loading indicator
 *
 * @example
 * <Spinner />
 *
 * @example
 * <Spinner size="large" label="Loading content..." />
 */
export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = "medium", label = "Loading...", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.spinner} ${styles[size]} ${className || ""}`}
        role="status"
        aria-label={label}
        {...props}
      >
        <svg viewBox="0 0 50 50" className={styles.svg}>
          <circle
            className={styles.circle}
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="4"
          />
        </svg>
        <span className={styles.srOnly}>{label}</span>
      </div>
    );
  }
);

Spinner.displayName = "Spinner";
