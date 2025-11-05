import React from 'react';

export type ProgressBarVariant = 'determinate' | 'indeterminate';
export type ProgressBarSize = 'small' | 'medium' | 'large';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Progress value (0-100) for determinate variant
   */
  value?: number;

  /**
   * Variant
   * @default 'determinate'
   */
  variant?: ProgressBarVariant;

  /**
   * Size
   * @default 'medium'
   */
  size?: ProgressBarSize;

  /**
   * Label text for screen readers
   */
  label?: string;

  /**
   * Show percentage text
   * @default false
   */
  showValue?: boolean;
}
