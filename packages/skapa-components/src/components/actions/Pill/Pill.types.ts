import React from 'react';

export type PillVariant = 'filter' | 'tag' | 'badge';
export type PillSize = 'small' | 'medium';

export interface PillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant of the pill
   * @default 'filter'
   */
  variant?: PillVariant;

  /**
   * Size of the pill
   * @default 'medium'
   */
  size?: PillSize;

  /**
   * Whether the pill is in an active/selected state
   * @default false
   */
  active?: boolean;

  /**
   * Icon to display before the text
   */
  icon?: React.ReactNode;

  /**
   * Icon to display after the text (e.g., close icon)
   */
  endIcon?: React.ReactNode;

  /**
   * Callback when end icon is clicked (e.g., for dismissible pills)
   */
  onEndIconClick?: (e: React.MouseEvent) => void;

  /**
   * Pill content
   */
  children: React.ReactNode;
}
