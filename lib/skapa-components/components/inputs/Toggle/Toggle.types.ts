import React from 'react';

export type ToggleSize = 'small' | 'medium' | 'large';

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Size of the toggle switch
   * @default 'medium'
   */
  size?: ToggleSize;

  /**
   * Label text
   */
  label?: React.ReactNode;

  /**
   * Helper text displayed below the toggle
   */
  helperText?: string;

  /**
   * Error message (shows error state)
   */
  error?: string;

  /**
   * Position of the label relative to the toggle
   * @default 'right'
   */
  labelPosition?: 'left' | 'right';
}
