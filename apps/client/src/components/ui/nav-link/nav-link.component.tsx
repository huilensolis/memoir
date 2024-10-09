"use client";

import Link from "next/link";
import { type TNavLink } from "./nav-link.models";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useEntryStore } from "@/app/app/entry/[id]/(store)/entry-store";
import { useAsideNavStore } from "@/components/feature/aside-nav/store";
import { ClientRoutingService } from "@/models/routing/client";

export function NavLink({
  icon,
  title,
  href,
  count,
  onClick = () => {},
}: TNavLink) {
  const [isActive, setIsActive] = useState(false);

  const pathName = usePathname();

  const closeDrawer = useAsideNavStore((state) => state.closeDrawer);
  const openDrawer = useAsideNavStore((state) => state.openDrawer);

  const getEntryState = useEntryStore((state) => state.getState);
  const getEntryId = useEntryStore((state) => state.getEntryId);

  useEffect(() => {
    if (pathName === href) {
      setIsActive(true);
      return;
    }

    setIsActive(false);
  }, [href, pathName]);

  const Icon = icon;

  function handleOnClick(e: React.MouseEvent<HTMLElement>) {
    onClick(e);

    // prevent user from navigating away from entry while saving entry
    closeDrawer();

    setTimeout(() => {
      openDrawer();
    }, 300);

    const entryId = getEntryId();
    if (
      entryId &&
      pathName.startsWith(ClientRoutingService.app.entries.readById(entryId)) &&
      (getEntryState() === "saving" || getEntryState() === "waiting")
    ) {
      window.alert(
        "Are you sure you want to leave this page? your changes has not been saved yet",
      );
    }
  }

  return (
    <Link
      href={href}
      className={`flex w-full justify-between py-2 px-2 rounded-sm text-md font-semibold transition-all duration-75 ${
        isActive
          ? "bg-primary text-neutral-50"
          : "bg-transparent hover:bg-neutral-200"
      }`}
      onClick={handleOnClick}
      replace
    >
      <section className="flex gap-2 items-center">
        <Icon className="w-5 h-5" />
        {title}
      </section>
      {count && (
        <span
          className={`flex item-center justify-center px-2 rounded ${
            isActive ? "bg-secondary text-primary" : "bg-primary text-secondary"
          }`}
        >
          {count}
        </span>
      )}
    </Link>
  );
}
