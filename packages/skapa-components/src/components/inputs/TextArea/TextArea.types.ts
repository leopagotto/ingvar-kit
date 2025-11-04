import React from 'react';

export type TextAreaSize = 'small' | 'medium' | 'large';
export type TextAreaVariant = 'outlined' | 'filled';
export type TextAreaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Size of the text area
   * @default 'medium'
   */
  size?: TextAreaSize;

  /**
   * Visual style variant
   * @default 'outlined'
   */
  variant?: TextAreaVariant;

  /**
   * Label text
   */
  label?: string;

  /**
   * Helper text displayed below the textarea
   */
  helperText?: string;

  /**
   * Error message (shows error state and message)
   */
  error?: string;

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

  /**
   * Resize behavior
   * @default 'vertical'
   */
  resize?: TextAreaResize;

  /**
   * Show character count
   * @default false
   */
  showCharCount?: boolean;
}
