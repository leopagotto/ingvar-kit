import React, { useEffect } from "react";
import IngkaToast from "@ingka/toast";
import type { ToastProps } from "./Toast.types";

/**
 * Toast notification component
 * Wraps @ingka/toast for official IKEA compliance
 *
 * @example
 * <Toast
 *   message="Item added to cart"
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 * />
 *
 * @example
 * <Toast
 *   message="Action completed"
 *   actionText="Undo"
 *   onAction={handleUndo}
 *   isOpen={isOpen}
 * />
 */
export const Toast: React.FC<ToastProps> = ({
  message,
  isOpen = false,
  actionText,
  onAction,
  onClose,
  duration = 4000,
  className,
}) => {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOpen, duration, onClose]);

  return (
    <IngkaToast
      text={message}
      isOpen={isOpen}
      onCloseRequest={onClose}
      {...(actionText && onAction
        ? {
            actionButtonText: actionText,
            actionClick: onAction,
            ariaLabel: `Toast with action: ${actionText}`,
          }
        : {})}
      className={className}
    />
  );
};

Toast.displayName = "Toast";
