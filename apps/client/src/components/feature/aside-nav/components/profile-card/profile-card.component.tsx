"use client";

import { SignOutBtn } from "@/components/feature/auth/sign-out";
import { AccordionRoot } from "@/components/ui/accordion";
import { Box } from "@/components/ui/box";
import { NavLink } from "@/components/ui/nav-link";
import { Bolt, ChevronsUpDown, CircleUserRound, Timer } from "lucide-react";

export async function ProfileCard() {
  return (
    <AccordionRoot.Provider type="single" collapsible className="w-full">
      <AccordionRoot.Item value="user-card" className="relative w-full">
        <AccordionRoot.Trigger className="w-full py-2 flex border border-neutral-300 rounded-md hover:bg-zinc-200">
          <article className="w-full flex items-center justify-between gap-2 p-1 px-2">
            <section className="flex gap-2 items-center">
              <CircleUserRound />
              <h4 className="font-semibold">username</h4>
            </section>
            <ChevronsUpDown />
          </article>
        </AccordionRoot.Trigger>
        <AccordionRoot.Content className="absolute top-full left-0 w-full mt-2">
          <Box className="rounded-md">
            <ul className="flex flex-col gap-2 p-1">
              <li>
                <NavLink icon={Bolt} href=" " title="settings" />
              </li>
              <li>
                <NavLink icon={Timer} href=" " title="test" />
              </li>
              <li>
                <SignOutBtn />
              </li>
            </ul>
          </Box>
        </AccordionRoot.Content>
      </AccordionRoot.Item>
    </AccordionRoot.Provider>
  );
}
