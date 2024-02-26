"use client";

import { type InputHTMLAttributes, forwardRef } from "react";

interface CustomInput extends InputHTMLAttributes<HTMLInputElement> {
  error: string | null;
  correct: boolean;
}

//  eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, CustomInput>(
  ({ error, correct, ...props }, inputRef) => (
    <div className="w-full flex flex-col">
      <input
        {...props}
        ref={inputRef}
        className={`py-2 px-2 text-neutral-700 font-semibold text-lg bg-neutral-100 border ${
          error
            ? "border-red-500 focus:border-red-300"
            : correct
              ? "border-teal-500 focus:border-blue-300"
              : "border-neutral-200 focus:border-neutral-300"
        } rounded-md focus:outline-none`}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  ),
);
