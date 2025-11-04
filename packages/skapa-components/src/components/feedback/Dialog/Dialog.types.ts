import React from 'react';

export type DialogSize = 'small' | 'medium' | 'large';

export interface DialogProps {
  /**
   * Dialog title
   */
  title: string;

  /**
   * Dialog content
   */
  children: React.ReactNode;

  /**
   * Whether the dialog is visible
   * @default false
   */
  isOpen?: boolean;

  /**
   * Size
   * @default 'medium'
   */
  size?: DialogSize;

  /**
   * Close button click handler
   */
  onClose?: () => void;

  /**
   * Primary action button text
   */
  confirmText?: string;

  /**
   * Primary action click handler
   */
  onConfirm?: () => void;

  /**
   * Cancel button text
   * @default 'Cancel'
   */
  cancelText?: string;

  /**
   * Cancel button click handler
   */
  onCancel?: () => void;

  /**
   * Whether clicking outside closes the dialog
   * @default true
   */
  escapable?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;
}
