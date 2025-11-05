import React from 'react';

export type DatePickerSize = 'small' | 'medium' | 'large';
export type DatePickerVariant = 'outlined' | 'filled';

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Size of the date picker
   * @default 'medium'
   */
  size?: DatePickerSize;

  /**
   * Visual variant
   * @default 'outlined'
   */
  variant?: DatePickerVariant;

  /**
   * Label text
   */
  label?: string;

  /**
   * Helper text displayed below the date picker
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
}
