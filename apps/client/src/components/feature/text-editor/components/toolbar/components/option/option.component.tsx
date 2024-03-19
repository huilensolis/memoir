import { type ButtonHTMLAttributes } from "react";

type TProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  isActive?: boolean;
};

export function ToolBarOption({
  children,
  isActive,
  disabled,
  className,
  ...props
}: TProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      aria-disabled={disabled}
      className={[
        "flex items-center justify-center w-full px-2 py-1.5 bg-white text-sm outline-none hover:bg-accent disabled:pointer-events-none disabled:opacity-50",
        isActive && "bg-accent text-accent-foreground",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
