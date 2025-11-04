import React from 'react';

export type CheckboxSize = 'small' | 'medium' | 'large';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Size of the checkbox
   * @default 'medium'
   */
  size?: CheckboxSize;

  /**
   * Label text
   */
  label?: React.ReactNode;

  /**
   * Helper text displayed below the checkbox
   */
  helperText?: string;

  /**
   * Error message (shows error state)
   */
  error?: string;

  /**
   * Indeterminate state (partially checked)
   * @default false
   */
  indeterminate?: boolean;
}
