import React from 'react';

export interface ModalProps {
  /**
   * Modal title
   */
  title?: string;

  /**
   * Modal content
   */
  children: React.ReactNode;

  /**
   * Whether the modal is visible
   * @default false
   */
  isOpen?: boolean;

  /**
   * Close button click handler (required)
   */
  onClose: () => void;

  /**
   * Footer action buttons
   */
  footer?: React.ReactNode;

  /**
   * Whether clicking outside closes the modal
   * @default true
   */
  escapable?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;
}
