"use client";

import { NavLink } from "@/components/ui/nav-link";
import { Axis3dIcon, BookOpen, PenTool, Search, Settings } from "lucide-react";
import { ClientRoutingService } from "@/models/routing/client";
import { type TNavLink } from "@/components/ui/nav-link/nav-link.models";

export function AsideNavLinks() {
  const NAV_ITEMS: TNavLink[] = [
    {
      title: "Home",
      icon: Axis3dIcon,
      href: ClientRoutingService.app.home,
    },
    {
      title: "Entries",
      icon: BookOpen,
      href: "entries",
      count: 6,
    },
    {
      title: "New Entry",
      icon: PenTool,
      href: ClientRoutingService.app.entries.create,
    },
    {
      title: "Settings",
      icon: Settings,
      href: "settings",
    },
  ];
  return (
    <ul className="w-full flex flex-col gap-1">
      {NAV_ITEMS.map((item, i) => (
        <li key={i}>
          <NavLink
            icon={item.icon}
            title={item.title}
            href={item.href}
            count={item.count}
          />
        </li>
      ))}
    </ul>
  );
}
