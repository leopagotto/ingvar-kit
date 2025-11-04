import React from "react";
import clsx from "clsx";
import type { DatePickerProps } from "./DatePicker.types";
import styles from "./DatePicker.module.css";

/**
 * DatePicker component for date selection
 * Uses native HTML5 date input for simplicity and accessibility
 *
 * @example
 * // Basic date picker
 * <DatePicker />
 *
 * @example
 * // With label
 * <DatePicker label="Birth Date" />
 *
 * @example
 * // Controlled
 * <DatePicker
 *   value={date}
 *   onChange={(e) => setDate(e.target.value)}
 *   label="Select Date"
 * />
 *
 * @example
 * // With min/max
 * <DatePicker
 *   label="Appointment"
 *   min="2025-01-01"
 *   max="2025-12-31"
 * />
 *
 * @example
 * // With error
 * <DatePicker
 *   label="Date"
 *   error="Please select a valid date"
 * />
 */
export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      size = "medium",
      variant = "outlined",
      label,
      helperText,
      error,
      required,
      disabled,
      fullWidth = false,
      className,
      ...props
    },
    ref
  ) => {
    const inputClasses = clsx(styles.input, styles[size], styles[variant], {
      [styles.error]: Boolean(error),
    });

    const labelClasses = clsx(styles.label, styles[size]);

    const helperTextClasses = clsx(styles.helperText, {
      [styles.error]: Boolean(error),
    });

    return (
      <div
        className={clsx(
          styles.container,
          { [styles.fullWidth]: fullWidth },
          className
        )}
      >
        {label && (
          <label className={labelClasses}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div
          className={clsx(styles.inputWrapper, {
            [styles.fullWidth]: fullWidth,
          })}
        >
          <input
            ref={ref}
            type="date"
            className={inputClasses}
            disabled={disabled}
            required={required}
            {...props}
          />
          <svg
            className={styles.icon}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 2V4M14 2V4M3 8H17M5 4H15C16.1046 4 17 4.89543 17 6V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V6C3 4.89543 3.89543 4 5 4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {(error || helperText) && (
          <span className={helperTextClasses}>{error || helperText}</span>
        )}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";
