import React from "react";

/**
 * Icon Component
 *
 * Displays IKEA Skapa icons from the Icons directory.
 * 600+ official IKEA design system icons available.
 *
 * @see https://npm.m2.blue.cdtapps.com/@ingka/ssr-icon
 */

export interface IconProps {
  /** Icon name (matches SVG filename without .svg extension) */
  name: string;

  /** Icon size */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;

  /** Icon color (uses currentColor by default to inherit from parent) */
  color?: string;

  /** Additional CSS classes */
  className?: string;

  /** Accessible label for screen readers */
  "aria-label"?: string;

  /** Whether icon is decorative (hides from screen readers) */
  decorative?: boolean;
}

const sizeMap = {
  xs: "w-3 h-3", // 12px
  sm: "w-4 h-4", // 16px
  md: "w-5 h-5", // 20px
  lg: "w-6 h-6", // 24px
  xl: "w-8 h-8", // 32px
};

/**
 * Icon component that renders IKEA Skapa SVG icons
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = "md",
  color = "currentColor",
  className = "",
  "aria-label": ariaLabel,
  decorative = false,
}) => {
  // Convert size to class or inline style
  const sizeClass = typeof size === "string" ? sizeMap[size] : "";
  const sizeStyle =
    typeof size === "number" ? { width: size, height: size } : {};

  // Accessibility attributes
  const ariaAttributes = decorative
    ? { "aria-hidden": "true", role: "presentation" }
    : { "aria-label": ariaLabel || name, role: "img" };

  return (
    <svg
      className={`inline-block ${sizeClass} ${className}`}
      style={{ ...sizeStyle, color }}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...ariaAttributes}
    >
      <use href={`/Icons/${name}.svg#icon`} />
    </svg>
  );
};

/**
 * Common icon name constants for type safety
 */
export const IconNames = {
  // Actions
  ADD: "plus",
  REMOVE: "minus",
  CLOSE: "cross",
  CHECK: "checkmark",
  EDIT: "pencil",
  DELETE: "trash-can",
  SEARCH: "magnifying-glass",

  // Arrows
  ARROW_UP: "arrow-up",
  ARROW_DOWN: "arrow-down",
  ARROW_LEFT: "arrow-left",
  ARROW_RIGHT: "arrow-right",
  CHEVRON_UP: "chevron-up",
  CHEVRON_DOWN: "chevron-down",
  CHEVRON_LEFT: "chevron-left",
  CHEVRON_RIGHT: "chevron-right",

  // Navigation
  HOME: "home",
  MENU: "menu",
  LINK: "link",
  LINK_OUT: "link-out",

  // Status
  INFO: "information-circle",
  WARNING: "warning-triangle",
  ERROR: "cross-circle",
  SUCCESS: "checkmark-circle",

  // Media
  IMAGE: "image",
  VIDEO: "video",
  CAMERA: "camera",

  // Shopping
  CART: "shopping-bag",
  HEART: "heart",
  HEART_FILLED: "heart-filled",
  GIFT: "gift-box",

  // User
  PERSON: "person",
  PEOPLE: "people",

  // Communication
  MAIL: "mail",
  PHONE: "phone",
  CHAT: "chat",
  BELL: "bell",

  // Files
  DOCUMENT: "document",
  FOLDER: "folder",
  DOWNLOAD: "arrow-cloud-out",
  UPLOAD: "arrow-cloud-in",

  // Settings
  GEAR: "gear",
  FILTER: "filters",

  // Visibility
  SHOW: "visibility-show",
  HIDE: "visibility-hide",
} as const;

export type IconName = (typeof IconNames)[keyof typeof IconNames];
