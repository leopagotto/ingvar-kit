import React from 'react';

export interface PillProps {
  /** Pill content */
  children: React.ReactNode;
  /** Pill variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Clickable pill */
  onClick?: () => void;
  /** Removable pill */
  onRemove?: () => void;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

export const Pill: React.FC<PillProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  onClick,
  onRemove,
  icon,
  disabled = false,
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-900 border-gray-200',
    primary: 'bg-blue-100 text-blue-900 border-blue-200',
    success: 'bg-green-100 text-green-900 border-green-200',
    warning: 'bg-yellow-100 text-yellow-900 border-yellow-200',
    error: 'bg-red-100 text-red-900 border-red-200',
  };

  const sizeClasses = {
    small: 'text-xs px-2 py-0.5 gap-1',
    medium: 'text-sm px-3 py-1 gap-1.5',
    large: 'text-base px-4 py-1.5 gap-2',
  };

  const isInteractive = onClick && !disabled;

  return (
    <span
      onClick={isInteractive ? onClick : undefined}
      className={`inline-flex items-center rounded-full border font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${isInteractive ? 'cursor-pointer hover:opacity-80' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
      {onRemove && !disabled && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </span>
  );
};
