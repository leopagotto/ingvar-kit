import React, { forwardRef, InputHTMLAttributes } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Checkbox label */
  label: string;
  /** Helper text below checkbox */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Indeterminate state (partial selection) */
  indeterminate?: boolean;
  /** Size variant */
  size?: "small" | "medium" | "large";
}

/**
 * Checkbox Component - Boolean selection from IKEA Ingka Skapa Design System
 *
 * Specification: docs/guides/Skapa-components/Checkbox.pdf
 * Package equivalent: @ingka/checkbox
 *
 * Features:
 * - Single or group selections
 * - Indeterminate state support
 * - Accessible with proper ARIA labels
 * - Error states with messages
 * - Multiple sizes
 *
 * @example
 * ```tsx
 * <Checkbox
 *   label="I agree to terms and conditions"
 *   checked={agreed}
 *   onChange={(e) => setAgreed(e.target.checked)}
 *   required
 * />
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      helperText,
      error = false,
      errorMessage,
      indeterminate = false,
      size = "medium",
      className = "",
      id,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const generatedId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    const sizeClasses = {
      small: "w-4 h-4",
      medium: "w-5 h-5",
      large: "w-6 h-6",
    };

    const labelSizeClasses = {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    };

    React.useEffect(() => {
      if (ref && typeof ref !== "function" && ref.current) {
        ref.current.indeterminate = indeterminate;
      }
    }, [indeterminate, ref]);

    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <div className="flex items-start gap-3">
          {/* Checkbox Input */}
          <input
            ref={ref}
            type="checkbox"
            id={generatedId}
            className={`
              ${sizeClasses[size]}
              mt-0.5 rounded border-2 transition-all duration-200
              ${error ? "border-red-500" : "border-gray-300"}
              text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              disabled:bg-gray-100 disabled:cursor-not-allowed
              cursor-pointer
            `}
            aria-invalid={error}
            aria-describedby={
              error && errorMessage
                ? `${generatedId}-error`
                : helperText
                ? `${generatedId}-helper`
                : undefined
            }
            disabled={disabled}
            {...props}
          />

          {/* Label & Helper Text */}
          <div className="flex-1">
            <label
              htmlFor={generatedId}
              className={`${labelSizeClasses[size]} font-medium text-gray-900 cursor-pointer select-none`}
            >
              {label}
            </label>

            {/* Helper Text */}
            {!error && helperText && (
              <p
                id={`${generatedId}-helper`}
                className="text-sm text-gray-600 mt-1"
              >
                {helperText}
              </p>
            )}

            {/* Error Message */}
            {error && errorMessage && (
              <p
                id={`${generatedId}-error`}
                className="text-sm text-red-600 mt-1 flex items-center gap-1"
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
          </div>
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

/**
 * CheckboxGroup - Group of related checkboxes
 */
export interface CheckboxGroupProps {
  /** Group label */
  label: string;
  /** Helper text for the group */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Group children */
  children: React.ReactNode;
  /** Required group */
  required?: boolean;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  helperText,
  error = false,
  errorMessage,
  children,
  required = false,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-sm font-medium text-gray-900">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </div>

      <div
        className="flex flex-col gap-2"
        role="group"
        aria-labelledby="checkbox-group-label"
      >
        {children}
      </div>

      {!error && helperText && (
        <p className="text-sm text-gray-600">{helperText}</p>
      )}

      {error && errorMessage && (
        <p
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
    </div>
  );
};

CheckboxGroup.displayName = "CheckboxGroup";
