import { Ref, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type InputTypes = {
  value: any;
  onChange?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
};

const Input = (
  {
    value,
    onChange,
    placeholder,
    onKeyDown,
    autoFocus,
    className,
    ...props
  }: InputTypes,
  ref: Ref<HTMLInputElement> | undefined
) => {
  return (
    <input
      {...props}
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

export default forwardRef(Input);
