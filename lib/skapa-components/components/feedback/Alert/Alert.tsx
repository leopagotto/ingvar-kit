import React from "react";
import IngkaInlineMessage from "@ingka/inline-message";
import type { AlertProps } from "./Alert.types";
import styles from "./Alert.module.css";

/**
 * Alert component for inline notifications
 * Wraps @ingka/inline-message for official IKEA compliance
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
    // Map our variants to Ingka variants
    const variantMap: Record<
      string,
      "informative" | "positive" | "cautionary" | "negative"
    > = {
      info: "informative",
      success: "positive",
      warning: "cautionary",
      error: "negative",
    };

    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${className || ""}`}
        {...props}
      >
        <IngkaInlineMessage
          variant={variantMap[variant]}
          title={title}
          body={message}
          dismissable={dismissible}
          onDismissClick={onDismiss as any}
          className={styles.alert}
        />
      </div>
    );
  }
);

Alert.displayName = "SkapaAlert";
