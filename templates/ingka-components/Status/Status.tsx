import React from 'react';

export interface StatusProps {
  /** Status variant */
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  /** Status label */
  children: React.ReactNode;
  /** Show dot indicator */
  showDot?: boolean;
  /** Size */
  size?: 'small' | 'medium' | 'large';
}

export const Status: React.FC<StatusProps> = ({
  variant = 'neutral',
  children,
  showDot = true,
  size = 'medium',
}) => {
  const variantClasses = {
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    neutral: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const dotClasses = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    neutral: 'bg-gray-500',
  };

  const sizeClasses = {
    small: 'text-xs px-2 py-0.5',
    medium: 'text-sm px-3 py-1',
    large: 'text-base px-4 py-1.5',
  };

  const dotSizeClasses = {
    small: 'w-1.5 h-1.5',
    medium: 'w-2 h-2',
    large: 'w-2.5 h-2.5',
  };

  return (
    <span 
      className={`inline-flex items-center gap-2 rounded-full border font-medium ${variantClasses[variant]} ${sizeClasses[size]}`}
      role="status"
    >
      {showDot && (
        <span 
          className={`rounded-full ${dotClasses[variant]} ${dotSizeClasses[size]}`} 
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};
