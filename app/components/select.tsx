import { Select } from "@base-ui/react/select";

interface SelectOption {
  value: string;
  label: string;
}

interface StyledSelectProps {
  options: SelectOption[];
  defaultValue?: string;
  name?: string;
  id?: string;
  onValueChange?: (value: string | null) => void;
  className?: string;
}

export function StyledSelect({
  options,
  defaultValue,
  name,
  id,
  onValueChange,
  className,
}: StyledSelectProps) {
  return (
    <Select.Root defaultValue={defaultValue} onValueChange={onValueChange} name={name}>
      <Select.Trigger
        id={id}
        className={`inline-flex items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 transition-colors hover:bg-gray-50 data-[popup-open]:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 ${className ?? ""}`}
      >
        <Select.Value />
        <Select.Icon className="text-gray-500 dark:text-gray-400">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner sideOffset={4}>
          <Select.Popup className="rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900">
            {options.map((opt) => (
              <Select.Item
                key={opt.value}
                value={opt.value}
                className="flex cursor-default items-center gap-2 px-3 py-1.5 text-sm text-gray-900 outline-none data-highlighted:bg-gray-100 dark:text-gray-100 dark:data-highlighted:bg-gray-800"
              >
                <Select.ItemIndicator className="text-gray-900 dark:text-gray-100">
                  <CheckIcon />
                </Select.ItemIndicator>
                <Select.ItemText>{opt.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M2.5 6L5 8.5L9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Select };
