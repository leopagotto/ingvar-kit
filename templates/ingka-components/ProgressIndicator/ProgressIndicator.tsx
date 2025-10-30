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
