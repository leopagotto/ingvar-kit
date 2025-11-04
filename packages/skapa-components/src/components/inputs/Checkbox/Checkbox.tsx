import React from "react";
import IngkaCheckbox from "@ingka/checkbox";
import type { CheckboxProps } from "./Checkbox.types";
import styles from "./Checkbox.module.css";

/**
 * Checkbox component for selecting/deselecting options
 * Wraps @ingka/checkbox for official IKEA compliance
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
      id,
      value = "on",
      ...props
    },
    ref
  ) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = Boolean(error);

    return (
      <div className={`${styles.wrapper} ${className || ""}`}>
        <IngkaCheckbox
          ref={ref}
          id={checkboxId}
          value={String(value)}
          label={label}
          caption={helperText}
          disabled={disabled}
          indeterminate={indeterminate}
          describedById={hasError ? `${checkboxId}-error` : undefined}
          className={styles.checkbox}
          {...props}
        />
        {error && (
          <span id={`${checkboxId}-error`} className={styles.error}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "SkapaCheckbox";
