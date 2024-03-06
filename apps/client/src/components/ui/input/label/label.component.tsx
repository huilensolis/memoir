"use client";

import { type HTMLAttributes } from "react";

type TProps = HTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
  htmlFor: string;
};

export function Label({ children, ...props }: TProps) {
  return <label {...props}>{children}</label>;
}
