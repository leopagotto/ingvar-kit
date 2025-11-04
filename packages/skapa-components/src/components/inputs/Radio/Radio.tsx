import React from "react";
import IngkaRadioButton from "@ingka/radio-button";
import type { RadioProps } from "./Radio.types";
import styles from "./Radio.module.css";

/**
 * Radio component for exclusive selection within a group
 * Wraps @ingka/radio-button for official IKEA compliance
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      size = "medium",
      label,
      helperText,
      error,
      disabled,
      className,
      id,
      value,
      ...props
    },
    ref
  ) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = Boolean(error);

    return (
      <div className={`${styles.wrapper} ${className || ""}`}>
        <IngkaRadioButton
          ref={ref}
          id={radioId}
          value={value ? String(value) : undefined}
          label={label}
          caption={helperText}
          disabled={disabled}
          describedById={hasError ? `${radioId}-error` : undefined}
          className={styles.radio}
          {...props}
        />
        {error && (
          <span id={`${radioId}-error`} className={styles.error}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Radio.displayName = "SkapaRadio";
