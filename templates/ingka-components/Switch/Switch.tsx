import React, { forwardRef, InputHTMLAttributes } from "react";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Switch label */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Size variant */
  size?: "small" | "medium" | "large";
  /** Disabled state */
  disabled?: boolean;
}

/**
 * Switch Component - Toggle between two states (IKEA Ingka Skapa)
 *
 * Specification: docs/guides/Skapa-components/Switch.pdf
 * Package equivalent: @ingka/switch
 *
 * Features:
 * - Binary on/off toggle
 * - Smooth animation
 * - Keyboard accessible
 * - Multiple sizes
 *
 * @example
 * ```tsx
 * <Switch
 *   label="Enable notifications"
 *   checked={enabled}
 *   onChange={(e) => setEnabled(e.target.checked)}
 * />
 * ```
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      helperText,
      size = "medium",
      disabled = false,
      className = "",
      id,
      checked,
      ...props
    },
    ref
  ) => {
    const generatedId =
      id || `switch-${Math.random().toString(36).substr(2, 9)}`;

    const sizeConfig = {
      small: {
        track: "w-10 h-5",
        thumb: "w-4 h-4",
        translate: "translate-x-5",
      },
      medium: {
        track: "w-12 h-6",
        thumb: "w-5 h-5",
        translate: "translate-x-6",
      },
      large: {
        track: "w-14 h-7",
        thumb: "w-6 h-6",
        translate: "translate-x-7",
      },
    };

    const config = sizeConfig[size];

    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <label
          htmlFor={generatedId}
          className="relative inline-flex items-center cursor-pointer"
        >
          {/* Hidden Checkbox */}
          <input
            ref={ref}
            type="checkbox"
            id={generatedId}
            className="sr-only peer"
            checked={checked}
            disabled={disabled}
            aria-describedby={helperText ? `${generatedId}-helper` : undefined}
            {...props}
          />

          {/* Switch Track */}
          <div
            className={`
              ${config.track}
              bg-gray-300 rounded-full peer
              peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2
              peer-checked:bg-blue-600
              peer-disabled:bg-gray-200 peer-disabled:cursor-not-allowed
              transition-colors duration-200 ease-in-out
              relative
            `}
          >
            {/* Switch Thumb */}
            <div
              className={`
                ${config.thumb}
                bg-white rounded-full shadow-md
                absolute left-0.5 top-1/2 -translate-y-1/2
                transition-transform duration-200 ease-in-out
                ${checked ? config.translate : "translate-x-0"}
              `}
            />
          </div>
        </label>

        {/* Label & Helper Text */}
        {(label || helperText) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={generatedId}
                className="text-sm font-medium text-gray-900 cursor-pointer"
              >
                {label}
              </label>
            )}
            {helperText && (
              <p id={`${generatedId}-helper`} className="text-xs text-gray-600">
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";
