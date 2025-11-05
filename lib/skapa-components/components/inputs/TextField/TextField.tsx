import React from "react";
import IngkaInputField from "@ingka/input-field";
import type { TextFieldProps } from "./TextField.types";
import styles from "./TextField.module.css";

/**
 * TextField Component - Single-line text input
 * Wraps @ingka/input-field for official IKEA compliance
 *
 * Used for collecting short text input from users. Supports validation,
 * helper text, icons, and error states.
 *
 * Based on: docs/ai-agents/skapa-design-system/02-INPUTS.md
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      size = "medium",
      label,
      helperText,
      error,
      required = false,
      fullWidth = false,
      disabled = false,
      className,
      id,
      type = "text",
      ...props
    },
    ref
  ) => {
    const inputId =
      id || `textfield-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = Boolean(error);

    // Map our types to Ingka's allowed types
    let ingkaType: "text" | "password" | "number" | "email" | "hidden" = "text";
    if (
      type === "email" ||
      type === "password" ||
      type === "number" ||
      type === "hidden"
    ) {
      ingkaType = type as any;
    }

    // Filter incompatible props
    const { variant, startIcon, endIcon, ...compatibleProps } = props as any;

    return (
      <div
        className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ""} ${
          className || ""
        }`}
      >
        <IngkaInputField
          ref={ref}
          id={inputId}
          label={label}
          type={ingkaType}
          req={required}
          disabled={disabled}
          describedById={
            hasError || helperText ? `${inputId}-helper` : undefined
          }
          className={styles.input}
          {...compatibleProps}
        />
        {(error || helperText) && (
          <span
            id={`${inputId}-helper`}
            className={hasError ? styles.error : styles.helperText}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

TextField.displayName = "SkapaTextField";
