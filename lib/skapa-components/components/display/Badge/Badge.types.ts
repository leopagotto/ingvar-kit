export type BadgeVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral';
export type BadgeSize = 'small' | 'medium';

export interface BadgeProps {
  /**
   * Badge text content
   */
  label: string;

  /**
   * Visual variant
   * @default 'neutral'
   */
  variant?: BadgeVariant;

  /**
   * Size
   * @default 'medium'
   */
  size?: BadgeSize;

  /**
   * Additional CSS class
   */
  className?: string;
}
