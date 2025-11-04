import React from 'react';
import type { BreadcrumbsProps } from './Breadcrumbs.types';
import styles from './Breadcrumbs.module.css';

/**
 * Breadcrumbs navigation component
 * 
 * @example
 * <Breadcrumbs 
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Chair' }
 *   ]}
 * />
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = '/',
  className,
}) => {
  return (
    <nav aria-label="Breadcrumb" className={`${styles.breadcrumbs} ${className || ''}`}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className={styles.item}>
              {item.href || item.onClick ? (
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                  className={styles.link}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </a>
              ) : (
                <span className={styles.current} aria-current="page">
                  {item.label}
                </span>
              )}
              {!isLast && <span className={styles.separator} aria-hidden="true">{separator}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumbs.displayName = 'Breadcrumbs';
