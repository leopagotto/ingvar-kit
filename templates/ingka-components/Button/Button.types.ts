import type { ReactNode, ButtonHTMLAttributes } from 'react';

/**
 * IKEA Ingka Skapa Button Component Types
 */

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /** Button style variant following IKEA design system */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';

  /** Button size following 8px grid system */
  size?: 'sm' | 'md' | 'lg';

  /** Show loading spinner and disable interactions */
  loading?: boolean;

  /** Make button full width of container */
  fullWidth?: boolean;

  /** Icon displayed before button text */
  startIcon?: ReactNode;

  /** Icon displayed after button text */
  endIcon?: ReactNode;

  /** Button content */
  children: ReactNode;

  /** Custom CSS class name */
  className?: string;

  /** Disable button interactions */
  disabled?: boolean;

  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Button variant styles mapping to IKEA color system
 */
export type ButtonVariant = ButtonProps['variant'];

/**
 * Button size mapping to IKEA spacing tokens
 */
export type ButtonSize = ButtonProps['size'];

/**
 * Button state for accessibility and interactions
 */
export interface ButtonState {
  isPressed: boolean;
  isHovered: boolean;
  isFocused: boolean;
  isDisabled: boolean;
  isLoading: boolean;
}
