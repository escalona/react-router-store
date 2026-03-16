import type { ReactNode } from "react";
import { Tooltip } from "@base-ui/react/tooltip";

interface StyledTooltipProps {
  content: string;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

export function StyledTooltip({ content, children, side = "top" }: StyledTooltipProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger className="inline-flex">{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner side={side} sideOffset={6}>
            <Tooltip.Popup className="rounded-md bg-gray-900 px-2.5 py-1.5 text-xs text-white shadow-md transition-opacity data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 dark:bg-gray-100 dark:text-gray-900">
              {content}
              <Tooltip.Arrow className="text-gray-900 dark:text-gray-100">
                <ArrowSvg />
              </Tooltip.Arrow>
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

function ArrowSvg() {
  return (
    <svg width="10" height="5" viewBox="0 0 10 5" fill="currentColor">
      <path d="M0 0L5 5L10 0H0Z" />
    </svg>
  );
}

export { Tooltip };
