import React, { useEffect } from "react";
import type { DialogProps } from "./Dialog.types";
import styles from "./Dialog.module.css";

/**
 * Dialog component for confirmations and decisions
 *
 * @example
 * <Dialog
 *   title="Confirm Delete"
 *   isOpen={isOpen}
 *   confirmText="Delete"
 *   onConfirm={handleDelete}
 *   onCancel={() => setIsOpen(false)}
 * >
 *   <p>Are you sure you want to delete this item?</p>
 * </Dialog>
 */
export const Dialog: React.FC<DialogProps> = ({
  title,
  children,
  isOpen = false,
  size = "medium",
  onClose,
  confirmText,
  onConfirm,
  cancelText = "Cancel",
  onCancel,
  escapable = true,
  className,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (escapable && e.key === "Escape") {
        onClose?.();
        onCancel?.();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, escapable, onClose, onCancel]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (escapable && e.target === e.currentTarget) {
      onClose?.();
      onCancel?.();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div
        className={`${styles.dialog} ${styles[size]} ${className || ""}`}
        role="dialog"
        aria-labelledby="dialog-title"
        aria-modal="true"
      >
        <div className={styles.header}>
          <h2 id="dialog-title" className={styles.title}>
            {title}
          </h2>
          {onClose && (
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close dialog"
            >
              ✕
            </button>
          )}
        </div>
        <div className={styles.content}>{children}</div>
        {(confirmText || cancelText) && (
          <div className={styles.footer}>
            {onCancel && (
              <button
                type="button"
                className={styles.cancelButton}
                onClick={onCancel}
              >
                {cancelText}
              </button>
            )}
            {confirmText && onConfirm && (
              <button
                type="button"
                className={styles.confirmButton}
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Dialog.displayName = "Dialog";
