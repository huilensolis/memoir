import { AuthService } from "@/models/api/auth";
import { ClientRoutingService } from "@/models/routing/client";
import { getCookie } from "@/utils/getCookies";
import { ArrowUpRight, Satellite } from "lucide-react";
import Link from "next/link";
import React from "react";

function AuthLinks() {
  return (
    <div className="flex gap-2 items-center">
      <Link
        href={ClientRoutingService.auth.signUp}
        className="flex items-center gap-1 p-1 px-3 hover:bg-neutral-200 transition-all duration-75 rounded-sm font-semibold text-neutral-700"
      >
        Sign Up
        <ArrowUpRight className="h-4 w-4" />
      </Link>
      <Link
        href={ClientRoutingService.auth.signIn}
        className="flex items-center gap-1 p-1 px-3 hover:bg-neutral-200 transition-all duration-75 rounded-sm font-semibold text-neutral-700"
      >
        Sign In
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function AppLink() {
  return (
    <Link
      href={ClientRoutingService.app.home}
      className="flex items-center gap-1 p-1 px-3 hover:bg-neutral-200 transition-all duration-75 rounded-sm font-semibold text-neutral-700"
    >
      Launch App
      <Satellite className="h-4 w-4" />
    </Link>
  );
}

const VIEWS: Record<string, React.JSX.Element> = {
  authenticated: <AuthLinks />,
  "non-authenticated": <AppLink />,
};

export async function AuthBtns() {
  const { cookie } = getCookie();

  if (!cookie) {
    return VIEWS["non-authenticated"];
  }

  const { user } = await AuthService.getUser({ Cookie: cookie });

  if (!user) {
    return VIEWS["non-authenticated"];
  }

  return VIEWS["authenticated"];
}
