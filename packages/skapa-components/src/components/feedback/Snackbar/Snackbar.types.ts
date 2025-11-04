export type SnackbarPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface SnackbarProps {
  /**
   * Snackbar message
   */
  message: string;

  /**
   * Whether the snackbar is visible
   * @default false
   */
  isOpen?: boolean;

  /**
   * Position on screen
   * @default 'bottom-center'
   */
  position?: SnackbarPosition;

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
   * @default 3000
   */
  duration?: number;

  /**
   * Additional CSS class
   */
  className?: string;
}
