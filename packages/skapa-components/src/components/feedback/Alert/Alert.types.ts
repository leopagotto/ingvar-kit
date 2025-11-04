import React from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';
export type AlertSize = 'small' | 'medium';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Alert message content
   */
  message: string | React.ReactNode;

  /**
   * Visual variant
   * @default 'info'
   */
  variant?: AlertVariant;

  /**
   * Size
   * @default 'medium'
   */
  size?: AlertSize;

  /**
   * Optional title
   */
  title?: string;

  /**
   * Whether the alert can be dismissed
   * @default false
   */
  dismissible?: boolean;

  /**
   * Dismiss button click handler
   */
  onDismiss?: () => void;
}
