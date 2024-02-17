"use server";

import { WithUserNotAuthenticated } from "@/components/wrappers/protect-from-authenticated-users";
import { ClientRoutingService } from "@/models/routing/client";
import Image from "next/image";
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
        <section className="w-full h-full md:flex hidden">
          <Image
            src={
              "/Leonardo_Diffusion_XL_Design_an_AI_image_generator_prompt_for_2.jpg"
            }
            width={1000}
            height={1000}
            alt="journaling book"
            className="w-full h-full object-cover object-center rounded-md"
          />
        </section>
      </div>
    </WithUserNotAuthenticated>
  );
}
