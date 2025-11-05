export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

export interface SkeletonProps {
  /**
   * Skeleton variant
   * @default 'text'
   */
  variant?: SkeletonVariant;

  /**
   * Width (CSS value)
   */
  width?: string | number;

  /**
   * Height (CSS value)
   */
  height?: string | number;

  /**
   * Additional CSS class
   */
  className?: string;
}
