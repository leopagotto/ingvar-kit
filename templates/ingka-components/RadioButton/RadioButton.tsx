import React, { forwardRef, InputHTMLAttributes } from "react";

export interface RadioButtonProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Radio button label */
  label: string;
  /** Helper text below radio button */
  helperText?: string;
  /** Value for the radio button */
  value: string;
  /** Size variant */
  size?: "small" | "medium" | "large";
}

/**
 * RadioButton Component - Single selection from options (IKEA Ingka Skapa)
 *
 * Specification: docs/guides/Skapa-components/Radio-button.pdf
 * Package equivalent: @ingka/radio-button
 *
 * Features:
 * - Mutually exclusive selection
 * - Accessible with proper ARIA
 * - Helper text support
 * - Multiple sizes
 *
 * @example
 * ```tsx
 * <RadioButton
 *   label="Standard Delivery (3-5 days)"
 *   value="standard"
 *   helperText="Free"
 *   name="delivery"
 *   checked={delivery === 'standard'}
 *   onChange={(e) => setDelivery(e.target.value)}
 * />
 * ```
 */
export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      label,
      helperText,
      value,
      size = "medium",
      className = "",
      id,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const generatedId =
      id || `radio-${value}-${Math.random().toString(36).substr(2, 9)}`;

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

    return (
      <div className={`flex items-start gap-3 ${className}`}>
        {/* Radio Input */}
        <input
          ref={ref}
          type="radio"
          id={generatedId}
          value={value}
          className={`
            ${sizeClasses[size]}
            mt-0.5 border-2 border-gray-300 transition-all duration-200
            text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            disabled:bg-gray-100 disabled:cursor-not-allowed
            cursor-pointer
          `}
          aria-describedby={helperText ? `${generatedId}-helper` : undefined}
          disabled={disabled}
          {...props}
        />

        {/* Label & Helper Text */}
        <div className="flex-1">
          <label
            htmlFor={generatedId}
            className={`${labelSizeClasses[size]} font-medium text-gray-900 cursor-pointer select-none block`}
          >
            {label}
          </label>

          {helperText && (
            <p
              id={`${generatedId}-helper`}
              className="text-sm text-gray-600 mt-1"
            >
              {helperText}
            </p>
          )}
        </div>
      </div>
    );
  }
);

RadioButton.displayName = "RadioButton";

/**
 * RadioButtonGroup - Group of related radio buttons
 */
export interface RadioButtonGroupProps {
  /** Group label */
  label: string;
  /** Currently selected value */
  value?: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Group name for radio buttons */
  name: string;
  /** Helper text for the group */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Required group */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Group children (RadioButton components) */
  children: React.ReactNode;
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  label,
  value,
  onChange,
  name,
  helperText,
  error = false,
  errorMessage,
  required = false,
  disabled = false,
  children,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

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
        role="radiogroup"
        aria-labelledby="radio-group-label"
        aria-required={required}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              name,
              checked: child.props.value === value,
              onChange: handleChange,
              disabled: disabled || child.props.disabled,
            });
          }
          return child;
        })}
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

RadioButtonGroup.displayName = "RadioButtonGroup";
