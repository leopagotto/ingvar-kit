export type LoadingSize = 'small' | 'medium' | 'large';

export interface LoadingProps {
  /**
   * Size
   * @default 'medium'
   */
  size?: LoadingSize;

  /**
   * Loading text for screen readers
   * @default 'Loading...'
   */
  label?: string;

  /**
   * Additional CSS class
   */
  className?: string;
}
