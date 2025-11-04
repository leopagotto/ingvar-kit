import React, { useState } from "react";
import clsx from "clsx";
import type { TextAreaProps } from "./TextArea.types";
import styles from "./TextArea.module.css";

/**
 * TextArea Component - Multi-line text input
 *
 * Used for collecting longer text input from users. Supports validation,
 * character counting, and customizable resize behavior.
 *
 * Based on: docs/ai-agents/skapa-design-system/02-INPUTS.md
 *
 * @example
 * ```tsx
 * // Basic textarea
 * <TextArea
 *   label="Description"
 *   placeholder="Enter description..."
 *   rows={5}
 * />
 *
 * // With character limit
 * <TextArea
 *   label="Comment"
 *   maxLength={500}
 *   showCharCount
 *   helperText="Share your thoughts"
 * />
 *
 * // Non-resizable
 * <TextArea
 *   label="Notes"
 *   resize="none"
 *   rows={4}
 * />
 * ```
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      size = "medium",
      variant = "outlined",
      label,
      helperText,
      error,
      required = false,
      fullWidth = false,
      disabled = false,
      resize = "vertical",
      showCharCount = false,
      className,
      id,
      value,
      defaultValue,
      maxLength,
      onChange,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = useState(
      (value || defaultValue || "").toString().length
    );

    const textareaId =
      id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = Boolean(error);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    const containerClasses = clsx(
      styles.textArea,
      styles[size],
      styles[variant],
      {
        [styles.error]: hasError,
        [styles.fullWidth]: fullWidth,
      },
      className
    );

    const textareaClasses = clsx(
      styles.textarea,
      styles[`resize${resize.charAt(0).toUpperCase()}${resize.slice(1)}`]
    );

    const charCountClasses = clsx(styles.charCount, {
      [styles.nearLimit]: maxLength && charCount >= maxLength * 0.9,
      [styles.atLimit]: maxLength && charCount >= maxLength,
    });

    const showFooter = error || helperText || (showCharCount && maxLength);

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={textareaId} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          className={textareaClasses}
          disabled={disabled}
          required={required}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          onChange={handleChange}
          aria-invalid={hasError}
          aria-describedby={
            error || helperText ? `${textareaId}-helper` : undefined
          }
          {...props}
        />

        {showFooter && (
          <div className={styles.footer}>
            {(error || helperText) && (
              <span id={`${textareaId}-helper`} className={styles.helperText}>
                {error || helperText}
              </span>
            )}
            {showCharCount && maxLength && (
              <span className={charCountClasses}>
                {charCount}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

TextArea.displayName = "SkapaTextArea";
