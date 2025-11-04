import React from 'react';

export type FABSize = 'small' | 'medium' | 'large';
export type FABPosition = 'bottom-right' | 'bottom-left' | 'bottom-center';

export interface FABProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Size of the FAB
   * @default 'medium'
   */
  size?: FABSize;

  /**
   * Position of the FAB (for fixed positioning)
   * @default 'bottom-right'
   */
  position?: FABPosition;

  /**
   * Icon to display in the FAB
   */
  icon: React.ReactNode;

  /**
   * Optional label (shows on hover)
   */
  label?: string;

  /**
   * Whether the FAB should be extended (show label always)
   * @default false
   */
  extended?: boolean;

  /**
   * Whether the FAB is in a loading state
   * @default false
   */
  loading?: boolean;
}
