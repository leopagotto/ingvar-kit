import React, { forwardRef, InputHTMLAttributes } from "react";

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Field label */
  label: string;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Show value indicator */
  showValue?: boolean;
  /** Value formatter function */
  formatValue?: (value: number) => string;
  /** Helper text */
  helperText?: string;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * Slider Component - Range selection (IKEA Ingka Skapa)
 *
 * Specification: docs/guides/Skapa-components/Slider.pdf
 * Package equivalent: @ingka/slider
 *
 * Features:
 * - Drag to select value
 * - Keyboard accessible (arrow keys)
 * - Value display
 * - Custom formatting
 *
 * @example
 * ```tsx
 * <Slider
 *   label="Price Range"
 *   min={0}
 *   max={1000}
 *   step={10}
 *   value={price}
 *   onChange={(e) => setPrice(Number(e.target.value))}
 *   showValue
 *   formatValue={(val) => `$${val}`}
 * />
 * ```
 */
export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      label,
      min = 0,
      max = 100,
      step = 1,
      showValue = false,
      formatValue = (val) => val.toString(),
      helperText,
      disabled = false,
      className = "",
      id,
      value = min,
      ...props
    },
    ref
  ) => {
    const generatedId =
      id || `slider-${Math.random().toString(36).substr(2, 9)}`;
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    const percentage = ((numValue - min) / (max - min)) * 100;

    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {/* Label & Value */}
        <div className="flex items-center justify-between">
          <label
            htmlFor={generatedId}
            className="text-sm font-medium text-gray-900"
          >
            {label}
          </label>
          {showValue && (
            <span className="text-sm font-semibold text-blue-600">
              {formatValue(numValue)}
            </span>
          )}
        </div>

        {/* Slider Track */}
        <div className="relative">
          <input
            ref={ref}
            type="range"
            id={generatedId}
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            aria-describedby={helperText ? `${generatedId}-helper` : undefined}
            className={`
              w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              disabled:bg-gray-100 disabled:cursor-not-allowed
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-blue-600
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:shadow-md
              [&::-webkit-slider-thumb]:transition-all
              [&::-webkit-slider-thumb]:hover:bg-blue-700
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-blue-600
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:shadow-md
            `}
            style={{
              background: `linear-gradient(to right, #2563eb 0%, #2563eb ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
            }}
            {...props}
          />
        </div>

        {/* Min & Max Labels */}
        <div className="flex justify-between text-xs text-gray-500">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>

        {/* Helper Text */}
        {helperText && (
          <p id={`${generatedId}-helper`} className="text-sm text-gray-600">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";
