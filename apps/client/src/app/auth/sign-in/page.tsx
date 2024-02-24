import { SignInForm } from "./components/form";

import Link from "next/link";
import { ClientRoutingService } from "@/models/routing/client";
import { ArrowUpRight } from "lucide-react";
export default function SignInPage() {
  return (
    <div className="flex flex-col items-stretch h-full">
      <nav className="w-full flex justify-end items-center gap-1">
        <Link
          href={ClientRoutingService.auth.signUp}
          className="flex items-center p-1 px-3 hover:bg-neutral-200 transition-all duration-75 rounded-sm font-semibold"
        >
          Sign Up
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </nav>
      <article className="w-full max-w-md h-full flex flex-col gap-6 items-center justify-center">
        <h1 className="text-4xl w-full font-medium text-neutral-700 text-balance">
          Log in to an existing account at Memoir
        </h1>
        <section className="w-full">
          <SignInForm />
        </section>
      </article>
    </div>
  );
}
