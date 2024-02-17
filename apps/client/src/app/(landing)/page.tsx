import { WithUserNotAuthenticated } from "@/components/wrappers/protect-from-authenticated-users";
import { ClientRoutingService } from "@/models/routing/client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <WithUserNotAuthenticated redirectUrl={ClientRoutingService.app.home}>
      <nav className="w-full items-center justify-center flex gap-1">
        <Link
          href={ClientRoutingService.auth.signUp}
          className="flex items-center p-1 px-3 hover:bg-neutral-200 transition-all duration-75 rounded-sm font-semibold text-neutral-700"
        >
          Sign Up
          <ArrowUpRight className="h-4 w-4" />
        </Link>
        <Link
          href={ClientRoutingService.auth.signIn}
          className="flex items-center p-1 px-3 hover:bg-neutral-200 transition-all duration-75 rounded-sm font-semibold text-neutral-700"
        >
          Sign In
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </nav>
      <article className="flex flex-col w-full items-center justify-center py-80">
        <h1 className="text-balance text-center text-neutral-700 font-bold text-5xl max-w-2xl w-full">
          Build a journaling habit and document your dreams, reflections,
          experiences, mood and memories.
        </h1>
      </article>
    </WithUserNotAuthenticated>
  );
}
