import React from 'react';

export type NumberFieldSize = 'small' | 'medium' | 'large';

export interface NumberFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Size of the number field
   * @default 'medium'
   */
  size?: NumberFieldSize;

  /**
   * Label text
   */
  label?: string;

  /**
   * Helper text displayed below the field
   */
  helperText?: string;

  /**
   * Error message (shows error state)
   */
  error?: string;

  /**
   * Full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Show increment/decrement buttons
   * @default true
   */
  showSteppers?: boolean;
}
