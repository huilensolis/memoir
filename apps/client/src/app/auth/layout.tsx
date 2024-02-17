"use server";

import { WithUserNotAuthenticated } from "@/components/wrappers/protect-from-authenticated-users";
import { ClientRoutingService } from "@/models/routing/client";
import Link from "next/link";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <WithUserNotAuthenticated redirectUrl={ClientRoutingService.app.home}>
      <div className="grid xl:grid-cols-2 grid-cols-1 grid-rows-1 w-full max-w-[110rem] h-screen p-5">
        <section className="flex flex-col items-center justify-center h-full w-full">
          <nav className="w-full flex justify-end items-center gap-2 px-5 py-2">
            <Link href="/auth/sign-up">SignUp</Link>
            <Link href="/auth/sign-in">Sign In</Link>
          </nav>
          {children}
        </section>
        <section className="w-full h-full xl:flex hidden relative">
          <ul className="grid grid-cols-6 grid-rows-8 w-full">
            <li className="w-full h-full opacity-0"></li>
            <li className="w-full h-full bg-neutral-300"></li>
            <li className="w-full h-full border-t border-x border-neutral-300"></li>
            <li className="w-full h-full opacity-0"></li>
            <li className="w-full h-full border border-l border-t border-b border-neutral-300"></li>
            <li className="w-full h-full bg-neutral-300"></li>
            <li className="w-full h-full bg-neutral-300"></li>
            <li className="w-full h-full border border-neutral-300 opacity-0"></li>
            <li className="w-full h-full bg-neutral-300"></li>
            <li className="w-full h-full border-y border-l border-neutral-300"></li>
            <li className="w-full h-full bg-neutral-300"></li>
            <li className="col-span-5 w-full h-full opacity-0"></li>
            <li className="w-full h-full border border-neutral-300"></li>
            <li className="w-full h-full col-span-6 row-span-2 flex items-center justify-start">
              <h2 className="text-balance text-neutral-700 font-bold text-5xl max-w-2xl w-full">
                Build a journaling habit and document your dreams, reflections,
                experiences, mood and memories.
              </h2>
            </li>
            <li className="col-span-5 w-full h-full"></li>
            <li className="w-full h-full border-x border-t border-neutral-300"></li>
            <li className="w-full h-full opacity-0"></li>
            <li className="w-full h-full bg-neutral-300"></li>
            <li className="w-full h-full opacity-0"></li>
            <li className="w-full h-full border-y border-neutral-300 opacity-0"></li>
            <li className="w-full h-full border border-neutral-300"></li>
            <li className="w-full h-full bg-neutral-300"></li>
            <li className="w-full h-full border border-neutral-300"></li>
            <li className="w-full h-full opacity-0"></li>
            <li className="w-full h-full bg-neutral-300"></li>
            <li className="w-full h-full border border-neutral-300"></li>
            <li className="w-full h-full bg-neutral-300"></li>
            <li className="w-full h-full"></li>
          </ul>
          <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center"></div>
        </section>
      </div>
    </WithUserNotAuthenticated>
  );
}
