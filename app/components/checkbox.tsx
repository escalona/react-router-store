import { Checkbox } from "@base-ui/react/checkbox";

interface StyledCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name?: string;
  disabled?: boolean;
  id?: string;
}

export function StyledCheckbox({
  checked,
  defaultChecked,
  onCheckedChange,
  name,
  disabled,
  id,
}: StyledCheckboxProps) {
  return (
    <Checkbox.Root
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      name={name}
      disabled={disabled}
      id={id}
      className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white transition-colors data-checked:border-gray-900 data-checked:bg-gray-900 data-disabled:cursor-not-allowed data-disabled:opacity-50 dark:border-gray-600 dark:bg-gray-900 dark:data-checked:border-gray-100 dark:data-checked:bg-gray-100"
    >
      <Checkbox.Indicator className="text-white dark:text-gray-900">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2.5 6L5 8.5L9.5 3.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
}

export { Checkbox };
