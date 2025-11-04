import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import type { CheckboxProps } from "./Checkbox.types";
import styles from "./Checkbox.module.css";

/**
 * Checkbox component for selecting/deselecting options
 *
 * @example
 * // Basic checkbox
 * <Checkbox label="I agree to the terms" />
 *
 * @example
 * // Controlled checkbox
 * <Checkbox
 *   checked={isChecked}
 *   onChange={(e) => setIsChecked(e.target.checked)}
 *   label="Subscribe to newsletter"
 * />
 *
 * @example
 * // Indeterminate state
 * <Checkbox
 *   indeterminate={true}
 *   label="Select all"
 * />
 *
 * @example
 * // With error
 * <Checkbox
 *   error="You must agree to continue"
 *   label="I agree to the terms"
 * />
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = "medium",
      label,
      helperText,
      error,
      indeterminate = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const combinedRef = (ref as React.RefObject<HTMLInputElement>) || inputRef;

    // Set indeterminate property (can only be set via DOM)
    useEffect(() => {
      if (combinedRef.current) {
        combinedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, combinedRef]);

    const checkboxClasses = clsx(styles.checkbox, styles[size], {
      [styles.error]: Boolean(error),
      [styles.disabled]: disabled,
    });

    const labelClasses = clsx(styles.label, styles[size], {
      [styles.disabled]: disabled,
    });

    const helperTextClasses = clsx(styles.helperText, styles[size], {
      [styles.error]: Boolean(error),
    });

    return (
      <div className={clsx(styles.container, className)}>
        <label
          className={clsx(styles.wrapper, { [styles.disabled]: disabled })}
        >
          <input
            ref={combinedRef}
            type="checkbox"
            className={styles.input}
            disabled={disabled}
            {...props}
          />
          <span className={checkboxClasses}>
            {indeterminate ? (
              // Indeterminate icon (dash)
              <svg
                className={styles.icon}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 8H12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              // Checkmark icon
              <svg
                className={styles.icon}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8L6.5 11.5L13 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
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

Checkbox.displayName = "Checkbox";
