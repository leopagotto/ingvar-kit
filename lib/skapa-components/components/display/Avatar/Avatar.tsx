import React from "react";
import IngkaAvatar from "@ingka/avatar";
import type { AvatarProps } from "./Avatar.types";

/**
 * Avatar component for user representation
 * Wraps @ingka/avatar for official IKEA compliance
 *
 * @example
 * // With initials
 * <Avatar text="JD" alt="John Doe" />
 *
 * @example
 * // With image
 * <Avatar src="/avatar.jpg" alt="John Doe" />
 *
 * @example
 * // Interactive avatar
 * <Avatar
 *   text="JD"
 *   alt="John Doe"
 *   onClick={() => console.log('clicked')}
 * />
 */
export const Avatar: React.FC<AvatarProps> = ({
  text,
  src,
  alt,
  size = "medium",
  variant = "primary",
  onClick,
  disabled = false,
  className,
}) => {
  return (
    <IngkaAvatar
      text={text}
      imageProps={src ? { src, alt } : undefined}
      screenReaderText={alt}
      size={size}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      className={className}
    />
  );
};

Avatar.displayName = "Avatar";
