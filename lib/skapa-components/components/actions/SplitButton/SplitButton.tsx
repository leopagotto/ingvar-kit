import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import type { SplitButtonProps, SplitButtonOption } from "./SplitButton.types";
import styles from "./SplitButton.module.css";

/**
 * SplitButton Component - Button with dropdown menu for related actions
 *
 * Combines a primary action button with a dropdown menu of alternative actions.
 * Common for "Save" (with "Save As", "Save & Close" options) or "Export" (with format choices).
 *
 * Based on: docs/ai-agents/skapa-design-system/01-ACTIONS.md
 *
 * @example
 * ```tsx
 * <SplitButton
 *   label="Save"
 *   onClick={handleSave}
 *   options={[
 *     { label: 'Save As...', value: 'save-as' },
 *     { label: 'Save & Close', value: 'save-close' },
 *     { label: 'Save Template', value: 'save-template' }
 *   ]}
 *   onOptionSelect={(option) => console.log(option.value)}
 * />
 * ```
 */
export const SplitButton: React.FC<SplitButtonProps> = ({
  variant = "primary",
  size = "medium",
  label,
  onClick,
  options,
  onOptionSelect,
  disabled = false,
  loading = false,
  icon,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option: SplitButtonOption) => {
    if (!option.disabled) {
      onOptionSelect(option);
      setIsOpen(false);
    }
  };

  const containerClasses = clsx(
    styles.splitButton,
    styles[variant],
    styles[size],
    {
      [styles.loading]: loading,
    },
    className
  );

  const toggleClasses = clsx(styles.toggle, {
    [styles.open]: isOpen,
  });

  const dropdownClasses = clsx(styles.dropdown, {
    [styles.open]: isOpen,
  });

  // Chevron down icon (simple SVG)
  const ChevronIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div ref={containerRef} className={containerClasses} role="group">
      <button
        type="button"
        className={styles.primary}
        onClick={onClick}
        disabled={disabled || loading}
        aria-label={label}
      >
        {icon && !loading && <span className={styles.icon}>{icon}</span>}
        {label}
      </button>

      <button
        type="button"
        className={toggleClasses}
        onClick={handleToggle}
        disabled={disabled || loading}
        aria-label="Show more options"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <span className={styles.toggleIcon}>
          <ChevronIcon />
        </span>
      </button>

      <div
        ref={dropdownRef}
        className={dropdownClasses}
        role="menu"
        aria-hidden={!isOpen}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={styles.option}
            onClick={() => handleOptionClick(option)}
            disabled={option.disabled}
            role="menuitem"
            tabIndex={isOpen ? 0 : -1}
          >
            {option.icon && (
              <span className={styles.optionIcon}>{option.icon}</span>
            )}
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

SplitButton.displayName = "SkappaSplitButton";
