import React, { forwardRef, TextareaHTMLAttributes, useState } from "react";

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /** Field label (required for accessibility) */
  label: string;
  /** Helper text below textarea */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Error message (shown when error=true) */
  errorMessage?: string;
  /** Required field indicator */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Maximum character count */
  maxLength?: number;
  /** Show character counter */
  showCounter?: boolean;
  /** Number of visible rows */
  rows?: number;
  /** Resize behavior */
  resize?: "none" | "vertical" | "horizontal" | "both";
}

/**
 * TextArea Component - Multi-line text input from IKEA Ingka Skapa Design System
 *
 * Specification: docs/guides/Skapa-components/Text-area.pdf
 * Package equivalent: @ingka/text-area
 *
 * Features:
 * - Multi-line text input with validation
 * - Character counter support
 * - Error states with messages
 * - Helper text for guidance
 * - Resize control
 * - Full WCAG 2.1 AA accessibility
 *
 * @example
 * ```tsx
 * <TextArea
 *   label="Description"
 *   placeholder="Enter description..."
 *   rows={4}
 *   maxLength={500}
 *   showCounter
 *   helperText="Describe your product"
 *   required
 * />
 * ```
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      helperText,
      error = false,
      errorMessage,
      required = false,
      disabled = false,
      maxLength,
      showCounter = false,
      rows = 4,
      resize = "vertical",
      className = "",
      id,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = useState(
      typeof value === "string" ? value.length : 0
    );

    const generatedId =
      id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    const baseClasses = `
      w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
      font-sans text-base leading-relaxed
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
    `;

    const stateClasses = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : "border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500";

    const resizeClasses = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize",
    };

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

        {/* Textarea */}
        <textarea
          ref={ref}
          id={generatedId}
          className={`${baseClasses} ${stateClasses} ${resizeClasses[resize]}`}
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
          rows={rows}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          {...props}
        />

        {/* Character Counter */}
        {showCounter && maxLength && (
          <div className="flex justify-end">
            <span
              className={`text-xs ${
                charCount > maxLength * 0.9
                  ? "text-orange-600"
                  : "text-gray-500"
              }`}
              aria-live="polite"
            >
              {charCount} / {maxLength}
            </span>
          </div>
        )}

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

TextArea.displayName = "TextArea";
