import React from 'react';

export type SelectSize = 'small' | 'medium' | 'large';
export type SelectVariant = 'outlined' | 'filled';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * Size of the select
   * @default 'medium'
   */
  size?: SelectSize;

  /**
   * Visual variant
   * @default 'outlined'
   */
  variant?: SelectVariant;

  /**
   * Label text
   */
  label?: string;

  /**
   * Helper text displayed below the select
   */
  helperText?: string;

  /**
   * Error message (shows error state)
   */
  error?: string;

  /**
   * Options for the select
   */
  options: SelectOption[];

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Full width
   * @default false
   */
  fullWidth?: boolean;
}
