export type AvatarSize = 'xsmall' | 'small' | 'medium' | 'large';
export type AvatarVariant = 'primary' | 'secondary';

export interface AvatarProps {
  /**
   * Avatar text/initials
   */
  text?: string;

  /**
   * Image URL
   */
  src?: string;

  /**
   * Alt text for screen readers (required)
   */
  alt: string;

  /**
   * Size
   * @default 'medium'
   */
  size?: AvatarSize;

  /**
   * Visual variant
   * @default 'primary'
   */
  variant?: AvatarVariant;

  /**
   * Click handler (makes avatar interactive)
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;
}
