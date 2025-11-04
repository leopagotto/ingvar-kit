import React from 'react';

export type IconButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type IconButtonSize = 'small' | 'medium' | 'large';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant of the icon button
   * @default 'primary'
   */
  variant?: IconButtonVariant;
  
  /**
   * Size of the icon button
   * @default 'medium'
   */
  size?: IconButtonSize;
  
  /**
   * Icon to display
   */
  icon: React.ReactNode;
  
  /**
   * Accessible label for screen readers (required)
   */
  'aria-label': string;
  
  /**
   * Whether the button is in a loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Whether the button is in an active/selected state
   * @default false
   */
  active?: boolean;
}
