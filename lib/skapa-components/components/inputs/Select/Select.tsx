import React from "react";
import IngkaSelect from "@ingka/select";
import type { SelectProps } from "./Select.types";
import styles from "./Select.module.css";

/**
 * Select component for dropdown selection
 * Wraps @ingka/select for official IKEA compliance
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      size = "medium",
      label,
      helperText,
      error,
      options,
      placeholder,
      required,
      disabled,
      fullWidth = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = Boolean(error);

    // Filter incompatible props
    const { variant, ...compatibleProps } = props as any;

    return (
      <div
        className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ""} ${
          className || ""
        }`}
      >
        <IngkaSelect
          ref={ref as any}
          id={selectId}
          label={label}
          req={required ? "Required" : undefined}
          disabled={disabled}
          hintText={placeholder || null}
          describedById={
            hasError || helperText ? `${selectId}-helper` : undefined
          }
          className={styles.select}
          {...compatibleProps}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </IngkaSelect>
        {(error || helperText) && (
          <span
            id={`${selectId}-helper`}
            className={hasError ? styles.error : styles.helperText}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = "SkapaSelect";
