import { twMerge } from "tailwind-merge";

type InputTypes = {
  value: any;
  onChange?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  ref: any;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
};

const Input = ({
  value,
  onChange,
  ref,
  placeholder,
  onKeyDown,
  autoFocus,
  className,
}: InputTypes) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={twMerge(
        "border border[#C4C4C4] text-sm text-[#615E5E] rounded p-2 italic",
        className
      )}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      autoFocus={autoFocus}
      ref={ref}
    />
  );
};

export default Input;
