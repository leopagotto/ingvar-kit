import React from 'react';
import type { PaginationProps } from './Pagination.types';
import styles from './Pagination.module.css';

/**
 * Pagination component
 * 
 * @example
 * <Pagination 
 *   totalPages={10}
 *   currentPage={3}
 *   onPageChange={(page) => console.log(page)}
 * />
 */
export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  className,
}) => {
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    if (leftSibling > 2) {
      pages.push(1);
      if (leftSibling > 3) pages.push('...');
    } else {
      for (let i = 1; i < leftSibling; i++) {
        pages.push(i);
      }
    }

    for (let i = leftSibling; i <= rightSibling; i++) {
      pages.push(i);
    }

    if (rightSibling < totalPages - 1) {
      if (rightSibling < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    } else {
      for (let i = rightSibling + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <nav aria-label="Pagination" className={`${styles.pagination} ${className || ''}`}>
      {showFirstLast && (
        <button
          type="button"
          className={styles.button}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="First page"
        >
          ««
        </button>
      )}
      <button
        type="button"
        className={styles.button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ‹
      </button>
      {pages.map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            type="button"
            className={`${styles.button} ${page === currentPage ? styles.active : ''}`}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ) : (
          <span key={index} className={styles.ellipsis}>
            {page}
          </span>
        )
      )}
      <button
        type="button"
        className={styles.button}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        ›
      </button>
      {showFirstLast && (
        <button
          type="button"
          className={styles.button}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page"
        >
          »»
        </button>
      )}
    </nav>
  );
};

Pagination.displayName = 'Pagination';
