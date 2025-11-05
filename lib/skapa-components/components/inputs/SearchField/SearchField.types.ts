import React from 'react';

export type SearchFieldSize = 'small' | 'medium' | 'large';

export interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Size of the search field
   * @default 'medium'
   */
  size?: SearchFieldSize;

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
   * Show search icon
   * @default true
   */
  showIcon?: boolean;

  /**
   * Callback when search is submitted
   */
  onSearch?: (value: string) => void;
}
