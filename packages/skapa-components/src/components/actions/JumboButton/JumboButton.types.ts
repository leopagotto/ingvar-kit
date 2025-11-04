import React from 'react';

export type JumboButtonVariant = 'regular' | 'footer';

export interface JumboButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant
   * @default 'regular'
   */
  variant?: JumboButtonVariant;
  
  /**
   * Main button label/heading
   */
  label: string;
  
  /**
   * Supporting text/description
   */
  description?: string;
  
  /**
   * Icon to display
   */
  icon?: React.ReactNode;
  
  /**
   * Whether the button is in a loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Whether the button should take full width
   * @default false
   */
  fullWidth?: boolean;
}
