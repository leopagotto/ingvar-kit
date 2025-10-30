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
