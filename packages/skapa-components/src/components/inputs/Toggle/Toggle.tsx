import React from "react";
import clsx from "clsx";
import type { ToggleProps } from "./Toggle.types";
import styles from "./Toggle.module.css";

/**
 * Toggle component for on/off switches
 *
 * @example
 * // Basic toggle
 * <Toggle label="Enable notifications" />
 *
 * @example
 * // Controlled toggle
 * <Toggle
 *   checked={isEnabled}
 *   onChange={(e) => setIsEnabled(e.target.checked)}
 *   label="Dark mode"
 * />
 *
 * @example
 * // Label on the left
 * <Toggle
 *   label="Wi-Fi"
 *   labelPosition="left"
 * />
 *
 * @example
 * // With helper text
 * <Toggle
 *   label="Auto-save"
 *   helperText="Automatically save your work every 5 minutes"
 * />
 *
 * @example
 * // Different sizes
 * <Toggle size="small" label="Small" />
 * <Toggle size="medium" label="Medium" />
 * <Toggle size="large" label="Large" />
 */
export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      size = "medium",
      label,
      helperText,
      error,
      labelPosition = "right",
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const trackClasses = clsx(styles.track, styles[size], {
      [styles.error]: Boolean(error),
      [styles.disabled]: disabled,
    });

    const labelClasses = clsx(styles.label, styles[size], {
      [styles.disabled]: disabled,
    });

    const helperTextClasses = clsx(styles.helperText, styles[size], {
      [styles.error]: Boolean(error),
      [styles.labelLeft]: labelPosition === "left",
    });

    return (
      <div className={clsx(styles.container, className)}>
        <label
          className={clsx(styles.wrapper, {
            [styles.disabled]: disabled,
            [styles.labelLeft]: labelPosition === "left",
          })}
        >
          <input
            ref={ref}
            type="checkbox"
            className={styles.input}
            disabled={disabled}
            role="switch"
            {...props}
          />
          <span className={trackClasses}>
            <span className={styles.thumb} />
          </span>
          {label && <span className={labelClasses}>{label}</span>}
        </label>
        {(error || helperText) && (
          <span className={helperTextClasses}>{error || helperText}</span>
        )}
      </div>
    );
  }
);

Toggle.displayName = "Toggle";
