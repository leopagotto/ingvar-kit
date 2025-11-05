import React from 'react';

export type BannerVariant = 'info' | 'warning' | 'error' | 'success';

export interface BannerProps {
  /**
   * Banner message content
   */
  message: string | React.ReactNode;

  /**
   * Visual variant
   * @default 'info'
   */
  variant?: BannerVariant;

  /**
   * Whether the banner can be dismissed
   * @default false
   */
  dismissible?: boolean;

  /**
   * Dismiss button click handler
   */
  onDismiss?: () => void;

  /**
   * Additional CSS class
   */
  className?: string;
}
