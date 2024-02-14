import { ButtonHTMLAttributes, ReactNode } from "react";

interface IPrimaryButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function PrimaryButton({ children, ...props }: IPrimaryButton) {
  return (
    <button
      {...props}
      className="px-6 py-3 w-full rounded-md bg-blue-600 text-lg text-neutral-50 font-bold disabled:brightness-90 hover:brightness-125 transition-all duration-75"
    >
      {children}
    </button>
  );
}
