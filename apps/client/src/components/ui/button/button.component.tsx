import * as React from "react";
import { Spinner } from "./components/spinner";
import { type ButtonProps, buttonVariants } from "./button.models";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading = false, children, disabled, ...props },
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
