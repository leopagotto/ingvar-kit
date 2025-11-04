import React from 'react';

export type ColorPickerSize = 'small' | 'medium' | 'large';

export interface ColorPickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Size of the color picker
   * @default 'medium'
   */
  size?: ColorPickerSize;

  /**
   * Label text
   */
  label?: string;

  /**
   * Helper text displayed below the color picker
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
   * Show color value as text
   * @default true
   */
  showValue?: boolean;
}
