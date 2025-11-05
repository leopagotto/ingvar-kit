export interface PaginationProps {
  /**
   * Total number of pages
   */
  totalPages: number;

  /**
   * Current page (1-indexed)
   */
  currentPage: number;

  /**
   * Page change handler
   */
  onPageChange: (page: number) => void;

  /**
   * Number of page buttons to show (odd number recommended)
   * @default 7
   */
  siblingCount?: number;

  /**
   * Show first/last page buttons
   * @default true
   */
  showFirstLast?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;
}
