export interface ToastProps {
  /**
   * Toast message content
   */
  message: string;

  /**
   * Whether the toast is visible
   * @default false
   */
  isOpen?: boolean;

  /**
   * Action button text (optional)
   */
  actionText?: string;

  /**
   * Action button click handler
   */
  onAction?: () => void;

  /**
   * Close button click handler
   */
  onClose?: () => void;

  /**
   * Auto-dismiss duration in ms (0 = no auto-dismiss)
   * @default 4000
   */
  duration?: number;

  /**
   * Additional CSS class
   */
  className?: string;
}
