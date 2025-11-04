import React from 'react';

export type TextFieldSize = 'small' | 'medium' | 'large';
export type TextFieldVariant = 'outlined' | 'filled';

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Size of the text field
   * @default 'medium'
   */
  size?: TextFieldSize;

  /**
   * Visual style variant
   * @default 'outlined'
   */
  variant?: TextFieldVariant;

  /**
   * Label text
   */
  label?: string;

  /**
   * Helper text displayed below the input
   */
  helperText?: string;

  /**
   * Error message (shows error state and message)
   */
  error?: string;

  /**
   * Icon to display at the start of the input
   */
  startIcon?: React.ReactNode;

  /**
   * Icon to display at the end of the input
   */
  endIcon?: React.ReactNode;

  /**
   * Whether the field is required
   * @default false
   */
  required?: boolean;

  /**
   * Whether the field should take full width
   * @default false
   */
  fullWidth?: boolean;
}
