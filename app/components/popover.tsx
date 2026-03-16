import type { ReactNode } from "react";
import { Popover } from "@base-ui/react/popover";

interface StyledPopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

export function StyledPopover({ trigger, children, side = "bottom" }: StyledPopoverProps) {
  return (
    <Popover.Root>
      <Popover.Trigger className="inline-flex">{trigger}</Popover.Trigger>

      <Popover.Portal>
        <Popover.Positioner side={side} sideOffset={8}>
          <Popover.Popup className="rounded-xl border border-gray-200 bg-white p-4 shadow-lg transition-all data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 dark:border-gray-700 dark:bg-gray-900">
            <Popover.Arrow className="text-gray-200 dark:text-gray-700">
              <ArrowSvg />
            </Popover.Arrow>
            {children}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

function ArrowSvg() {
  return (
    <svg width="14" height="7" viewBox="0 0 14 7" fill="currentColor">
      <path d="M0 0L7 7L14 0H0Z" />
    </svg>
  );
}

export { Popover };
