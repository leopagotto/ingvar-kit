#!/bin/bash

# Create QuantityStepper component
mkdir -p QuantityStepper
cat > QuantityStepper/QuantityStepper.tsx << 'COMPONENT'
import React from 'react';

export interface QuantityStepperProps {
  /** Current quantity value */
  value: number;
  /** Change handler */
  onChange: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** ARIA label */
  'aria-label'?: string;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value,
  onChange,
  min = 0,
  max = 99,
  step = 1,
  disabled = false,
  size = 'medium',
  'aria-label': ariaLabel = 'Quantity',
}) => {
  const sizeClasses = {
    small: 'h-8',
    medium: 'h-10',
    large: 'h-12',
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - step);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + step);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div 
      className={`inline-flex items-center border border-gray-300 rounded-lg ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        className="px-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors h-full rounded-l-lg"
        aria-label="Decrease quantity"
      >
        −
      </button>
      
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        disabled={disabled}
        className="w-16 text-center border-x border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-full"
        aria-label={`${ariaLabel} value`}
      />
      
      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        className="px-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors h-full rounded-r-lg"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};
COMPONENT

cat > QuantityStepper/index.ts << 'INDEX'
export { QuantityStepper } from './QuantityStepper';
export type { QuantityStepperProps } from './QuantityStepper';
INDEX

# Create Search component
mkdir -p Search
cat > Search/Search.tsx << 'COMPONENT'
import React, { useState } from 'react';

export interface SearchProps {
  /** Search input value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Search handler (called on Enter or button click) */
  onSearch?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Show search button */
  showButton?: boolean;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** ARIA label */
  'aria-label'?: string;
}

export const Search: React.FC<SearchProps> = ({
  value: controlledValue,
  onChange,
  onSearch,
  placeholder = 'Search...',
  disabled = false,
  showButton = true,
  size = 'medium',
  'aria-label': ariaLabel = 'Search',
}) => {
  const [internalValue, setInternalValue] = useState('');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const sizeClasses = {
    small: 'h-8 text-sm',
    medium: 'h-10 text-base',
    large: 'h-12 text-lg',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch?.(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} role="search">
      <div className={`relative flex items-center ${sizeClasses[size]}`}>
        <span className="absolute left-3 text-gray-400" aria-hidden="true">
          🔍
        </span>
        
        <input
          type="search"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full pl-10 ${showButton ? 'pr-20' : 'pr-4'} border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]}`}
          aria-label={ariaLabel}
        />
        
        {showButton && (
          <button
            type="submit"
            disabled={disabled}
            className="absolute right-2 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            aria-label="Submit search"
          >
            Search
          </button>
        )}
      </div>
    </form>
  );
};
COMPONENT

cat > Search/index.ts << 'INDEX'
export { Search } from './Search';
export type { SearchProps } from './Search';
INDEX

# Create Grid component
mkdir -p Grid
cat > Grid/Grid.tsx << 'COMPONENT'
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
COMPONENT

cat > Grid/index.ts << 'INDEX'
export { Grid } from './Grid';
export type { GridProps } from './Grid';
INDEX

# Create AspectRatioBox component
mkdir -p AspectRatioBox
cat > AspectRatioBox/AspectRatioBox.tsx << 'COMPONENT'
import React from 'react';

export interface AspectRatioBoxProps {
  /** Aspect ratio (e.g., "16:9", "4:3", "1:1") */
  ratio?: '16:9' | '4:3' | '3:2' | '1:1' | '9:16';
  /** Children content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export const AspectRatioBox: React.FC<AspectRatioBoxProps> = ({
  ratio = '16:9',
  children,
  className = '',
}) => {
  const ratioMap = {
    '16:9': 'pb-[56.25%]',
    '4:3': 'pb-[75%]',
    '3:2': 'pb-[66.67%]',
    '1:1': 'pb-[100%]',
    '9:16': 'pb-[177.78%]',
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className={`${ratioMap[ratio]}`} />
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  );
};
COMPONENT

cat > AspectRatioBox/index.ts << 'INDEX'
export { AspectRatioBox } from './AspectRatioBox';
export type { AspectRatioBoxProps } from './AspectRatioBox';
INDEX

# Create ProgressIndicator component
mkdir -p ProgressIndicator
cat > ProgressIndicator/ProgressIndicator.tsx << 'COMPONENT'
import React from 'react';

export interface ProgressIndicatorProps {
  /** Progress value (0-100) */
  value: number;
  /** Progress variant */
  variant?: 'linear' | 'circular';
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Show percentage label */
  showLabel?: boolean;
  /** Color variant */
  color?: 'primary' | 'success' | 'warning' | 'error';
  /** ARIA label */
  'aria-label'?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  value,
  variant = 'linear',
  size = 'medium',
  showLabel = true,
  color = 'primary',
  'aria-label': ariaLabel = 'Progress',
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const colorClasses = {
    primary: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600',
  };

  const sizeClasses = {
    small: 'h-1',
    medium: 'h-2',
    large: 'h-3',
  };

  if (variant === 'circular') {
    const circleSize = {
      small: 40,
      medium: 60,
      large: 80,
    };
    const strokeWidth = 4;
    const radius = (circleSize[size] - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={circleSize[size]} height={circleSize[size]}>
          <circle
            cx={circleSize[size] / 2}
            cy={circleSize[size] / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={circleSize[size] / 2}
            cy={circleSize[size] / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${circleSize[size] / 2} ${circleSize[size] / 2})`}
            className={colorClasses[color]}
            role="progressbar"
            aria-valuenow={clampedValue}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={ariaLabel}
          />
        </svg>
        {showLabel && (
          <span className="absolute text-sm font-semibold">
            {Math.round(clampedValue)}%
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div 
        className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
      >
        <div
          className={`h-full ${colorClasses[color]} transition-all duration-300 ease-in-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-sm text-gray-600 text-right">
          {Math.round(clampedValue)}%
        </div>
      )}
    </div>
  );
};
COMPONENT

cat > ProgressIndicator/index.ts << 'INDEX'
export { ProgressIndicator } from './ProgressIndicator';
export type { ProgressIndicatorProps } from './ProgressIndicator';
INDEX

# Create Status component
mkdir -p Status
cat > Status/Status.tsx << 'COMPONENT'
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
COMPONENT

cat > Status/index.ts << 'INDEX'
export { Status } from './Status';
export type { StatusProps } from './Status';
INDEX

# Create IconButton component
mkdir -p IconButton
cat > IconButton/IconButton.tsx << 'COMPONENT'
import React from 'react';

export interface IconButtonProps {
  /** Button icon (emoji or SVG) */
  icon: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Button size */
  size?: 'small' | 'medium' | 'large';
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** ARIA label (required for accessibility) */
  'aria-label': string;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  'aria-label': ariaLabel,
  type = 'button',
}) => {
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-10 h-10 text-base',
    large: 'w-12 h-12 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {loading ? (
        <span className="animate-spin" aria-hidden="true">⏳</span>
      ) : (
        icon
      )}
    </button>
  );
};
COMPONENT

cat > IconButton/index.ts << 'INDEX'
export { IconButton } from './IconButton';
export type { IconButtonProps } from './IconButton';
INDEX

# Create Pill component
mkdir -p Pill
cat > Pill/Pill.tsx << 'COMPONENT'
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
COMPONENT

cat > Pill/index.ts << 'INDEX'
export { Pill } from './Pill';
export type { PillProps } from './Pill';
INDEX

echo "✅ Created 8 additional components:"
echo "  - QuantityStepper (Form)"
echo "  - Search (Form)"
echo "  - Grid (Layout)"
echo "  - AspectRatioBox (Layout)"
echo "  - ProgressIndicator (Feedback)"
echo "  - Status (Feedback)"
echo "  - IconButton (Button variant)"
echo "  - Pill (Button variant)"
