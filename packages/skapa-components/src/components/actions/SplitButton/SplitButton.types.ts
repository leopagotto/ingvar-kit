import React from 'react';

export type SplitButtonSize = 'small' | 'medium' | 'large';
export type SplitButtonVariant = 'primary' | 'secondary';

export interface SplitButtonOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SplitButtonProps {
  /**
   * Visual style variant
   * @default 'primary'
   */
  variant?: SplitButtonVariant;

  /**
   * Size of the button
   * @default 'medium'
   */
  size?: SplitButtonSize;

  /**
   * Primary button label
   */
  label: string;

  /**
   * Primary button action
   */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Dropdown menu options
   */
  options: SplitButtonOption[];

  /**
   * Handler for option selection
   */
  onOptionSelect: (option: SplitButtonOption) => void;

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the button is in a loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Icon for primary button
   */
  icon?: React.ReactNode;

  /**
   * Additional CSS class
   */
  className?: string;
}
