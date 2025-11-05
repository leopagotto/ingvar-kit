import React from "react";
import IngkaSwitch from "@ingka/switch";
import type { ToggleProps } from "./Toggle.types";
import styles from "./Toggle.module.css";

/**
 * Toggle component for on/off switches
 * Wraps @ingka/switch for official IKEA compliance
 */
export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      size = "medium",
      label,
      helperText,
      error,
      disabled,
      className,
      id,
      value = "on",
      ...props
    },
    ref
  ) => {
    const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = Boolean(error);

    // Filter incompatible props
    const { labelPosition, ...compatibleProps } = props as any;

    return (
      <div className={`${styles.wrapper} ${className || ""}`}>
        <IngkaSwitch
          ref={ref as any}
          id={toggleId}
          value={String(value)}
          label={label}
          disabled={disabled}
          describedById={
            hasError || helperText ? `${toggleId}-helper` : undefined
          }
          className={styles.toggle}
          {...compatibleProps}
        />
        {(error || helperText) && (
          <span
            id={`${toggleId}-helper`}
            className={hasError ? styles.error : styles.helperText}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Toggle.displayName = "SkapaToggle";
