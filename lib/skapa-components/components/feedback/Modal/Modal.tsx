import React from "react";
import IngkaModal from "@ingka/modal";
import type { ModalProps } from "./Modal.types";
import styles from "./Modal.module.css";

/**
 * Modal dialog component
 * Wraps @ingka/modal for official IKEA compliance
 *
 * @example
 * <Modal
 *   title="Confirm Action"
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 * >
 *   <p>Are you sure?</p>
 * </Modal>
 *
 * @example
 * <Modal
 *   title="Details"
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   footer={
 *     <>
 *       <button onClick={handleClose}>Cancel</button>
 *       <button onClick={handleSubmit}>Submit</button>
 *     </>
 *   }
 * >
 *   <p>Modal content</p>
 * </Modal>
 */
export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  isOpen = false,
  onClose,
  footer,
  escapable = true,
  className,
}) => {
  // Ingka Modal requires a specific child structure (Sheets/Theatre/Prompt)
  // We'll wrap content in a simple structure
  const modalContent = (
    <div className={styles.modalContent}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );

  return (
    <IngkaModal
      visible={isOpen}
      handleCloseBtn={onClose}
      escapable={escapable}
      className={className}
    >
      {modalContent}
    </IngkaModal>
  );
};

Modal.displayName = "Modal";
