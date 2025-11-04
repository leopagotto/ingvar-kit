import React from "react";
import clsx from "clsx";
import type { TextFieldProps } from "./TextField.types";
import styles from "./TextField.module.css";

/**
 * TextField Component - Single-line text input
 *
 * Used for collecting short text input from users. Supports validation,
 * helper text, icons, and error states.
 *
 * Based on: docs/ai-agents/skapa-design-system/02-INPUTS.md
 *
 * @example
 * ```tsx
 * // Basic text field
 * <TextField
 *   label="Email"
 *   placeholder="Enter your email"
 *   type="email"
 * />
 *
 * // With validation
 * <TextField
 *   label="Username"
 *   required
 *   error="Username is required"
 *   helperText="Must be at least 3 characters"
 * />
 *
 * // With icons
 * <TextField
 *   label="Search"
 *   startIcon={<SearchIcon />}
 *   placeholder="Search products..."
 * />
 * ```
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      size = "medium",
      variant = "outlined",
      label,
      helperText,
      error,
      startIcon,
      endIcon,
      required = false,
      fullWidth = false,
      disabled = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId =
      id || `textfield-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = Boolean(error);

    const containerClasses = clsx(
      styles.textField,
      styles[size],
      styles[variant],
      {
        [styles.error]: hasError,
        [styles.fullWidth]: fullWidth,
      },
      className
    );

    const inputClasses = clsx(styles.input, {
      [styles.hasStartIcon]: Boolean(startIcon),
      [styles.hasEndIcon]: Boolean(endIcon),
    });

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div className={styles.inputContainer}>
          {startIcon && <span className={styles.startIcon}>{startIcon}</span>}

          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-describedby={
              error || helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />

          {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
        </div>

        {(error || helperText) && (
          <span id={`${inputId}-helper`} className={styles.helperText}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

TextField.displayName = "SkapaTextField";
