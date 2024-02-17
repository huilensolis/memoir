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
      <div className="grid md:grid-cols-2 grid-cols-1 grid-rows-1 w-full max-w-7xl h-screen p-5">
        <section className="flex flex-col items-center justify-center h-full w-full">
          <nav className="w-full flex justify-end items-center gap-2 px-5 py-2">
            <Link href="/auth/sign-up">SignUp</Link>
            <Link href="/auth/sign-in">Sign In</Link>
          </nav>
          {children}
        </section>
        <section className="w-full h-full md:flex hidden relative">
          <ul className="grid grid-cols-3 grid-rows-6 w-full">
            <li className="col-span-2 w-full h-full border-b border-r border-neutral-300"></li>
            <li className="w-full h-full"></li>
            <li className="w-full h-full border-r border-neutral-300"></li>
            <li className="col-span-2 w-full h-full"></li>
            <li className="col-span-3 w-full h-full border-t border-neutral-300"></li>
            <li className="col-span-2 w-full h-ful"></li>
            <li className="w-full h-full"></li>
            <li className="w-full h-full border-r border-neutral-300"></li>
            <li className="col-span-2 w-full h-full border-t border-neutral-300"></li>
            <li className="col-span-2 w-full h-full border-t border-r border-neutral-300"></li>
            <li className="w-full h-full"></li>
          </ul>
          <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
            <h2 className="text-balance text-center text-neutral-700 font-bold text-5xl">
              Begin your journey of self-discovery – one entry a day. Unlock the
              power of reflection and growth with Memoir
            </h2>
          </div>
        </section>
      </div>
    </WithUserNotAuthenticated>
  );
}
