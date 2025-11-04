import React from "react";
import type { AlertProps } from "./Alert.types";
import styles from "./Alert.module.css";

/**
 * Alert component for inline notifications
 *
 * @example
 * <Alert message="This is an informational alert" />
 *
 * @example
 * <Alert
 *   title="Success"
 *   message="Your changes have been saved"
 *   variant="success"
 * />
 *
 * @example
 * <Alert
 *   message="Error occurred"
 *   variant="error"
 *   dismissible
 *   onDismiss={() => console.log('dismissed')}
 * />
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      message,
      variant = "info",
      size = "medium",
      title,
      dismissible = false,
      onDismiss,
      className,
      ...props
    },
    ref
  ) => {
    const icons = {
      info: "🔵",
      success: "✅",
      warning: "⚠️",
      error: "❌",
    };

    return (
      <div
        ref={ref}
        className={`${styles.alert} ${styles[variant]} ${styles[size]} ${
          className || ""
        }`}
        role="alert"
        {...props}
      >
        <span className={styles.icon} aria-hidden="true">
          {icons[variant]}
        </span>
        <div className={styles.content}>
          {title && <div className={styles.title}>{title}</div>}
          <div className={styles.message}>{message}</div>
        </div>
        {dismissible && (
          <button
            type="button"
            className={styles.dismissButton}
            onClick={onDismiss}
            aria-label="Dismiss alert"
          >
            ✕
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";
