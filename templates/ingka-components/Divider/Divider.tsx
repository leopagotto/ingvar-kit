import React from 'react';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ orientation = 'horizontal', className = '' }) => {
  return orientation === 'horizontal' 
    ? <hr className={`border-gray-200 ${className}`} />
    : <div className={`w-px bg-gray-200 h-full ${className}`} />;
};
