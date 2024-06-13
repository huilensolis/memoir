"use client";

import { NavLink } from "@/components/ui/nav-link";
import { Axis3dIcon } from "lucide-react";
import { ClientRoutingService } from "@/models/routing/client";
import { type TNavLink } from "@/components/ui/nav-link/nav-link.models";
import { useAsideNavStore } from "../../store";

export function AsideNavLinks() {
  const NAV_ITEMS: TNavLink[] = [
    {
      title: "Home",
      icon: Axis3dIcon,
      href: ClientRoutingService.app.home,
    },
    // {
    //   title: "Entries",
    //   icon: BookOpen,
    //   href: "entries",
    //   count: 6,
    // },
    // {
    //   title: "Settings",
    //   icon: Settings,
    //   href: "settings",
    // },
  ];

  const closeDrawer = useAsideNavStore((state) => state.closeDrawer);
  const openDrawer = useAsideNavStore((state) => state.openDrawer);

  return (
    <ul className="w-full flex flex-col gap-1">
      {NAV_ITEMS.map((item, i) => (
        <li key={i}>
          <NavLink
            icon={item.icon}
            title={item.title}
            href={item.href}
            count={item.count}
            onClick={() => {
              closeDrawer();

              setTimeout(() => {
                openDrawer();
              }, 300);
            }}
          />
        </li>
      ))}
    </ul>
  );
}
