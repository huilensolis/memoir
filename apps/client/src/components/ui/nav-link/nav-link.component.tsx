"use client";

import Link from "next/link";
import { type TNavLink } from "./nav-link.models";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function NavLink({ icon, title, href, count }: TNavLink) {
  const [isActive, setIsActive] = useState(false);

  const pathName = usePathname();

  useEffect(() => {
    if (typeof location !== "undefined") {
      if (location.pathname === href) setIsActive(true);
    }
  }, [href, pathName]);

  const Icon = icon;
  return (
    <Link
      href={href}
      className={`flex w-full justify-between py-2 px-2 rounded-md text-md font-semibold transition-all duration-75 ${
        isActive
          ? "bg-neutral-950 text-white"
          : "bg-transparent hover:bg-zinc-200"
      }`}
    >
      <section className="flex gap-2 items-center">
        <Icon className="w-5 h-5" />
        {title}
      </section>
      {count && (
        <span
          className={`flex item-center justify-center px-2 rounded border ${
            isActive
              ? "bg-gray-700 border-gray-500"
              : "bg-gray-200 border-gray-400"
          }`}
        >
          {count}
        </span>
      )}
    </Link>
  );
}
