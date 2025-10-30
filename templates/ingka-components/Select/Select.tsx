import React, { forwardRef, SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /** Field label */
  label: string;
  /** Select options */
  options: SelectOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Helper text below select */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Required field */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Size variant */
  size?: "small" | "medium" | "large";
}

/**
 * Select Component - Dropdown selection from IKEA Ingka Skapa Design System
 *
 * Specification: docs/guides/Skapa-components/Select-native.pdf
 * Package equivalent: @ingka/select
 *
 * Features:
 * - Native select dropdown
 * - Keyboard accessible
 * - Error states
 * - Helper text
 * - Placeholder support
 *
 * @example
 * ```tsx
 * <Select
 *   label="Country"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'uk', label: 'United Kingdom' }
 *   ]}
 *   value={country}
 *   onChange={(e) => setCountry(e.target.value)}
 *   required
 * />
 * ```
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      placeholder,
      helperText,
      error = false,
      errorMessage,
      required = false,
      disabled = false,
      size = "medium",
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const generatedId =
      id || `select-${Math.random().toString(36).substr(2, 9)}`;

    const sizeClasses = {
      small: "py-2 text-sm",
      medium: "py-3 text-base",
      large: "py-4 text-lg",
    };

    const baseClasses = `
      w-full px-4 ${sizeClasses[size]} rounded-lg border-2 transition-all duration-200
      font-sans bg-white appearance-none
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
      cursor-pointer
      pr-10 bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3e%3cpolyline points="6 9 12 15 18 9"%3e%3c/polyline%3e%3c/svg%3e')]
      bg-[length:20px] bg-[right_12px_center] bg-no-repeat
    `;

    const stateClasses = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : "border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500";

    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        {/* Label */}
        <label
          htmlFor={generatedId}
          className="text-sm font-medium text-gray-900"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="required">
              *
            </span>
          )}
        </label>

        {/* Select */}
        <select
          ref={ref}
          id={generatedId}
          className={`${baseClasses} ${stateClasses}`}
          aria-invalid={error}
          aria-describedby={
            error && errorMessage
              ? `${generatedId}-error`
              : helperText
              ? `${generatedId}-helper`
              : undefined
          }
          aria-required={required}
          disabled={disabled}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Error Message */}
        {error && errorMessage && (
          <p
            id={`${generatedId}-error`}
            className="text-sm text-red-600 flex items-center gap-1"
            role="alert"
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {errorMessage}
          </p>
        )}

        {/* Helper Text */}
        {!error && helperText && (
          <p id={`${generatedId}-helper`} className="text-sm text-gray-600">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
