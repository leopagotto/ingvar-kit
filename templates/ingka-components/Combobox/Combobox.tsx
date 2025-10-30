import React, { useState, useRef, useEffect } from "react";
import { Icon } from "../Icon/Icon";

/**
 * Combobox Component
 *
 * Searchable dropdown with keyboard navigation.
 * Based on IKEA Ingka Skapa design system.
 *
 * @see https://npm.m2.blue.cdtapps.com/@ingka/combobox
 */

export interface ComboboxOption {
  /** Option value */
  value: string;

  /** Option label (displayed to user) */
  label: string;

  /** Option group (for categorization) */
  group?: string;

  /** Disabled state */
  disabled?: boolean;
}

export interface ComboboxProps {
  /** Field label */
  label: string;

  /** Available options */
  options: ComboboxOption[];

  /** Selected value */
  value?: string;

  /** Change handler */
  onChange?: (value: string) => void;

  /** Placeholder text */
  placeholder?: string;

  /** Allow custom values (not in options) */
  allowCustom?: boolean;

  /** Dropdown max height */
  maxHeight?: string;

  /** Error state */
  error?: boolean;

  /** Error message */
  errorMessage?: string;

  /** Helper text */
  helperText?: string;

  /** Disabled state */
  disabled?: boolean;

  /** Required field */
  required?: boolean;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Combobox component
 */
export const Combobox: React.FC<ComboboxProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Search...",
  allowCustom = false,
  maxHeight = "300px",
  error = false,
  errorMessage,
  helperText,
  disabled = false,
  required = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get display label for selected value
  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption?.label || value || "";

  // Filter options based on search
  const filteredOptions = React.useMemo(() => {
    if (!searchTerm) return options;
    const term = searchTerm.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(term) ||
        opt.value.toLowerCase().includes(term)
    );
  }, [options, searchTerm]);

  // Group options by category
  const groupedOptions = React.useMemo(() => {
    const groups: Record<string, ComboboxOption[]> = {};
    filteredOptions.forEach((opt) => {
      const group = opt.group || "default";
      if (!groups[group]) groups[group] = [];
      groups[group].push(opt);
    });
    return groups;
  }, [filteredOptions]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex].value);
        } else if (allowCustom && searchTerm) {
          handleSelect(searchTerm);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setSearchTerm("");
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const inputClasses = [
    "w-full px-3 py-2 border rounded-md transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-offset-0",
    error
      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
      : "border-gray-300 focus:border-blue-500 focus:ring-blue-200",
    disabled && "bg-gray-100 cursor-not-allowed",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`relative ${className}`}>
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? searchTerm : displayValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="combobox-dropdown"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon
            name={isOpen ? "chevron-up" : "chevron-down"}
            size="sm"
            decorative
          />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          id="combobox-dropdown"
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
          style={{ maxHeight }}
        >
          <ul className="overflow-y-auto max-h-full" role="listbox">
            {filteredOptions.length === 0 ? (
              <li className="px-3 py-2 text-gray-500 text-sm">
                {allowCustom
                  ? "Press Enter to add custom value"
                  : "No results found"}
              </li>
            ) : (
              Object.entries(groupedOptions).map(([group, groupOptions]) => (
                <React.Fragment key={group}>
                  {group !== "default" && (
                    <li className="px-3 py-1 text-xs font-semibold text-gray-500 bg-gray-50 sticky top-0">
                      {group}
                    </li>
                  )}
                  {groupOptions.map((option, index) => {
                    const globalIndex = filteredOptions.indexOf(option);
                    const isHighlighted = highlightedIndex === globalIndex;
                    const isSelected = value === option.value;

                    return (
                      <li
                        key={option.value}
                        role="option"
                        aria-selected={isSelected}
                        className={[
                          "px-3 py-2 cursor-pointer transition-colors",
                          isHighlighted && "bg-blue-50",
                          isSelected && "bg-blue-100 font-medium",
                          option.disabled &&
                            "opacity-50 cursor-not-allowed pointer-events-none",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() =>
                          !option.disabled && handleSelect(option.value)
                        }
                        onMouseEnter={() => setHighlightedIndex(globalIndex)}
                      >
                        {option.label}
                      </li>
                    );
                  })}
                </React.Fragment>
              ))
            )}
          </ul>
        </div>
      )}

      {/* Helper/Error Text */}
      {(helperText || errorMessage) && (
        <p
          className={`mt-1 text-sm ${error ? "text-red-600" : "text-gray-500"}`}
        >
          {error ? errorMessage : helperText}
        </p>
      )}
    </div>
  );
};
