import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonTypes = {
  type?: "button" | "submit" | "reset";
  className?: string;
  label?: string;
  onClick?: (e: any) => void;
  labelClassName?: string;
  children?: React.ReactNode;
};
const Button = ({
  type,
  className,
  labelClassName,
  label,
  onClick,
  children,
}: ButtonTypes) => {
  return (
    <button
      type={type ?? "button"}
      className={twMerge("bg-main px-4 hover:[#79001B] rounded text-white", className)}
      onClick={onClick}
    >
      <span className={twMerge("text-xs", labelClassName)}>
        {children ?? label ?? "Save"}
      </span>
    </button>
  );
};

export default Button;
