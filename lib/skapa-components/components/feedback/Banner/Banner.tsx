import React from "react";
import IngkaBanner from "@ingka/banner";
import type { BannerProps } from "./Banner.types";

/**
 * Banner notification component for persistent messages
 * Wraps @ingka/banner for official IKEA compliance
 *
 * @example
 * <Banner message="Important information" variant="info" />
 *
 * @example
 * <Banner
 *   message="Action required"
 *   variant="warning"
 *   dismissible
 *   onDismiss={() => console.log('dismissed')}
 * />
 */
export const Banner: React.FC<BannerProps> = ({
  message,
  variant = "info",
  dismissible = false,
  onDismiss,
  className,
}) => {
  return (
    <IngkaBanner
      body={message}
      emergency={variant === "error"}
      dismissable={dismissible}
      dismissHandler={onDismiss}
      ariaCloseTxt="Close banner"
      className={className}
    />
  );
};

Banner.displayName = "Banner";
