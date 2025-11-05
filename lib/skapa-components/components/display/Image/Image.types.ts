export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Image source URL (required)
   */
  src: string;

  /**
   * Alt text (required for accessibility)
   */
  alt: string;

  /**
   * Whether to use lazy loading
   * @default true
   */
  lazy?: boolean;

  /**
   * Object fit
   * @default 'cover'
   */
  fit?: 'cover' | 'contain' | 'fill' | 'none';
}
