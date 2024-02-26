import { type LucideIcon } from "lucide-react";

export type TNavLink = {
  icon: LucideIcon;
  title: string;
  href: string;
  count?: number;
};
