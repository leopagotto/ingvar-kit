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
