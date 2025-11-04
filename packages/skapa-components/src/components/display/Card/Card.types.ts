import React from 'react';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant
   * @default 'elevated'
   */
  variant?: CardVariant;

  /**
   * Card header content
   */
  header?: React.ReactNode;

  /**
   * Card footer content
   */
  footer?: React.ReactNode;

  /**
   * Whether the card is clickable/interactive
   * @default false
   */
  interactive?: boolean;

  /**
   * Full width
   * @default false
   */
  fullWidth?: boolean;
}
