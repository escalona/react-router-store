import { Switch } from "@base-ui/react/switch";

interface StyledSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name?: string;
  disabled?: boolean;
  id?: string;
}

export function StyledSwitch({
  checked,
  defaultChecked,
  onCheckedChange,
  name,
  disabled,
  id,
}: StyledSwitchProps) {
  return (
    <Switch.Root
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      name={name}
      disabled={disabled}
      id={id}
      className="relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full bg-gray-200 transition-colors data-checked:bg-gray-900 data-disabled:cursor-not-allowed data-disabled:opacity-50 dark:bg-gray-700 dark:data-checked:bg-gray-100"
    >
      <Switch.Thumb className="pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm transition-transform data-checked:translate-x-5 data-unchecked:translate-x-0.5 dark:bg-gray-900 dark:data-checked:bg-gray-900" />
    </Switch.Root>
  );
}

export { Switch };
