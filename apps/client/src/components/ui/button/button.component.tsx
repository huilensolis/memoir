import * as React from "react";
import { type ButtonProps, buttonVariants } from "./button.models";
import { Spinner } from "../spinner";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      children,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        disabled={disabled}
        aria-disabled={disabled}
        ref={ref}
        {...props}
      >
        {loading ? <Spinner /> : children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
