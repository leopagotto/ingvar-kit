import React from 'react';

export type SliderSize = 'small' | 'medium' | 'large';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Size of the slider
   * @default 'medium'
   */
  size?: SliderSize;

  /**
   * Label text
   */
  label?: string;

  /**
   * Helper text displayed below the slider
   */
  helperText?: string;

  /**
   * Error message (shows error state)
   */
  error?: string;

  /**
   * Show current value
   * @default true
   */
  showValue?: boolean;

  /**
   * Full width
   * @default false
   */
  fullWidth?: boolean;
}
