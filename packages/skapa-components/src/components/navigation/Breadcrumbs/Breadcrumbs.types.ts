export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  /**
   * Breadcrumb items
   */
  items: BreadcrumbItem[];

  /**
   * Separator character
   * @default '/'
   */
  separator?: string;

  /**
   * Additional CSS class
   */
  className?: string;
}
