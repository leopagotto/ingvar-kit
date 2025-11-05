export type SpinnerSize = 'small' | 'medium' | 'large';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size
   * @default 'medium'
   */
  size?: SpinnerSize;

  /**
   * Loading text for screen readers
   * @default 'Loading...'
   */
  label?: string;
}
