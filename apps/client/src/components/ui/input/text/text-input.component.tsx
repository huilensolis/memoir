"use client";

import { type InputHTMLAttributes, forwardRef } from "react";

type TProps = InputHTMLAttributes<HTMLInputElement> & {
  error: string | null;
  correct: boolean;
};

//  eslint-disable-next-line react/display-name
export const TextInput = forwardRef<HTMLInputElement, TProps>(
  ({ error, correct, className, ...props }, inputRef) => (
    <div className="w-full flex flex-col">
      <input
        {...props}
        ref={inputRef}
        className={[
          error
            ? "border-red-500 focus:border-red-300"
            : "focus-visible:ring-1 focus-visible:ring-ring",
          "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        ].join(" ")}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  ),
);
