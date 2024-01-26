import { InputHTMLAttributes } from "react";

interface CustomInput extends InputHTMLAttributes<HTMLInputElement> {
  error: boolean;
  correct: boolean;
}

export function Input({ error, correct, ...props }: CustomInput) {
  return (
    <input
      {...props}
      className="py-2 px-2 text-neutral-700 font-semibold text-lg bg-neutral-100 border border-neutral-200 rounded-md focus:outline-none focus:border-neutral-300"
    />
  );
}
