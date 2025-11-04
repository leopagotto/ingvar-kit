import React from "react";
import type { ProgressBarProps } from "./ProgressBar.types";
import styles from "./ProgressBar.module.css";

/**
 * Progress bar component for loading states
 *
 * @example
 * <ProgressBar value={60} />
 *
 * @example
 * <ProgressBar value={75} showValue label="Upload progress" />
 *
 * @example
 * <ProgressBar variant="indeterminate" label="Loading..." />
 */
export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value = 0,
      variant = "determinate",
      size = "medium",
      label = "Progress",
      showValue = false,
      className,
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(100, Math.max(0, value));

    return (
      <div
        ref={ref}
        className={`${styles.container} ${className || ""}`}
        {...props}
      >
        {showValue && variant === "determinate" && (
          <span className={styles.valueText} aria-live="polite">
            {Math.round(clampedValue)}%
          </span>
        )}
        <div
          className={`${styles.progressBar} ${styles[size]} ${
            variant === "indeterminate" ? styles.indeterminate : ""
          }`}
          role="progressbar"
          aria-label={label}
          aria-valuenow={variant === "determinate" ? clampedValue : undefined}
          aria-valuemin={variant === "determinate" ? 0 : undefined}
          aria-valuemax={variant === "determinate" ? 100 : undefined}
        >
          <div
            className={styles.fill}
            style={{
              width: variant === "determinate" ? `${clampedValue}%` : "100%",
            }}
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";
