import React from 'react';

export type RadioSize = 'small' | 'medium' | 'large';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Size of the radio button
   * @default 'medium'
   */
  size?: RadioSize;

  /**
   * Label text
   */
  label?: React.ReactNode;

  /**
   * Helper text displayed below the radio
   */
  helperText?: string;

  /**
   * Error message (shows error state)
   */
  error?: string;
}
