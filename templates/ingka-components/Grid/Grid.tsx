import React from 'react';

export interface GridProps {
  /** Grid children */
  children: React.ReactNode;
  /** Number of columns */
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  /** Responsive columns */
  colsMobile?: number;
  colsTablet?: number;
  colsDesktop?: number;
  /** Gap between items */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Additional CSS classes */
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  cols = 3,
  colsMobile,
  colsTablet,
  colsDesktop,
  gap = 'md',
  className = '',
}) => {
  const gapClasses = {
    none: 'gap-0',
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };

  const colClasses = `grid-cols-${cols}`;
  const mobileColClasses = colsMobile ? `grid-cols-${colsMobile}` : '';
  const tabletColClasses = colsTablet ? `md:grid-cols-${colsTablet}` : '';
  const desktopColClasses = colsDesktop ? `lg:grid-cols-${colsDesktop}` : '';

  return (
    <div 
      className={`grid ${mobileColClasses || colClasses} ${tabletColClasses} ${desktopColClasses} ${gapClasses[gap]} ${className}`}
    >
      {children}
    </div>
  );
};
