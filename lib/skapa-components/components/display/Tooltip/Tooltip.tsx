import React from "react";
import IngkaTooltip from "@ingka/tooltip";
import type { TooltipProps } from "./Tooltip.types";

/**
 * Tooltip component for contextual help
 * Wraps @ingka/tooltip for official IKEA compliance
 *
 * @example
 * <Tooltip content="Help text">
 *   <button>Hover me</button>
 * </Tooltip>
 *
 * @example
 * <Tooltip content="Info" placement="right">
 *   <span>Item</span>
 * </Tooltip>
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = "top",
  className,
}) => {
  // Map our placement to Ingka position
  const positionMap = {
    top: "top",
    right: "trailing",
    bottom: "bottom",
    left: "leading",
  } as const;

  return (
    <IngkaTooltip
      tooltipText={typeof content === "string" ? content : ""}
      position={positionMap[placement]}
      describedById={`tooltip-${Math.random().toString(36).substr(2, 9)}`}
      className={className}
    >
      {children}
    </IngkaTooltip>
  );
};

Tooltip.displayName = "Tooltip";
