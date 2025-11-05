export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  /**
   * Orientation
   * @default 'horizontal'
   */
  orientation?: DividerOrientation;

  /**
   * Line style
   * @default 'solid'
   */
  variant?: DividerVariant;

  /**
   * Text label for divider
   */
  label?: string;
}
