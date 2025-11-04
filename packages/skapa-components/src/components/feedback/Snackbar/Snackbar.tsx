import React, { useEffect } from "react";
import type { SnackbarProps } from "./Snackbar.types";
import styles from "./Snackbar.module.css";

/**
 * Snackbar notification component (similar to Toast but with position control)
 *
 * @example
 * <Snackbar
 *   message="Item added to cart"
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 * />
 *
 * @example
 * <Snackbar
 *   message="Action completed"
 *   actionText="Undo"
 *   onAction={handleUndo}
 *   position="top-right"
 *   isOpen={isOpen}
 * />
 */
export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  isOpen = false,
  position = "bottom-center",
  actionText,
  onAction,
  onClose,
  duration = 3000,
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

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.snackbar} ${styles[position]} ${className || ""}`}
    >
      <span className={styles.message}>{message}</span>
      {actionText && (
        <button
          type="button"
          className={styles.actionButton}
          onClick={onAction}
        >
          {actionText}
        </button>
      )}
      {onClose && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
      )}
    </div>
  );
};

Snackbar.displayName = "Snackbar";
