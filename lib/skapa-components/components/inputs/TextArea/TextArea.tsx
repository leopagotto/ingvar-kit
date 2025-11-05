import React from "react";
import IngkaTextArea from "@ingka/text-area";
import type { TextAreaProps } from "./TextArea.types";
import styles from "./TextArea.module.css";

/**
 * TextArea Component - Multi-line text input
 * Wraps @ingka/text-area for official IKEA compliance
 *
 * Used for collecting longer text input from users. Supports validation
 * and customizable behavior.
 *
 * Based on: docs/ai-agents/skapa-design-system/02-INPUTS.md
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      helperText,
      error,
      required = false,
      fullWidth = false,
      disabled = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const textareaId =
      id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = Boolean(error);

    // Filter incompatible props
    const { size, variant, resize, showCharCount, ...compatibleProps } =
      props as any;

    return (
      <div
        className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ""} ${
          className || ""
        }`}
      >
        <IngkaTextArea
          ref={ref}
          id={textareaId}
          label={label}
          req={required}
          disabled={disabled}
          describedById={
            hasError || helperText ? `${textareaId}-helper` : undefined
          }
          className={styles.textarea}
          {...compatibleProps}
        />
        {(error || helperText) && (
          <span
            id={`${textareaId}-helper`}
            className={hasError ? styles.error : styles.helperText}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

TextArea.displayName = "SkapaTextArea";
