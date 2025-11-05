import React from 'react';

export type DualButtonVariant = 'default' | 'subtle';
export type DualButtonSize = 'medium' | 'large';

export interface DualButtonProps {
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: DualButtonVariant;

  /**
   * Size of the dual button
   * @default 'medium'
   */
  size?: DualButtonSize;

  /**
   * Primary action button label
   */
  primaryLabel: string;

  /**
   * Secondary action button label
   */
  secondaryLabel: string;

  /**
   * Primary action handler
   */
  onPrimaryClick: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Secondary action handler
   */
  onSecondaryClick: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Whether both buttons are disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Icon for primary button
   */
  primaryIcon?: React.ReactNode;

  /**
   * Icon for secondary button
   */
  secondaryIcon?: React.ReactNode;

  /**
   * Additional CSS class
   */
  className?: string;
}
