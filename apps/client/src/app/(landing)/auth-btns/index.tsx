"use client";

import { Spinner } from "@/components/ui/spinner";
import { AuthService } from "@/models/api/auth";
import { ClientRoutingService } from "@/models/routing/client";
import { useServerStatusStore } from "@/stores/server-status";
import { ArrowUpRight, Satellite } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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

type TViews = "authenticated" | "non-authenticated";

const VIEWS: Record<TViews, React.JSX.Element> = {
  authenticated: <AppLink />,
  "non-authenticated": <AuthLinks />,
} as const;

export function AuthBtns() {
  const [role, setRole] = useState<TViews>("non-authenticated");
  const [loading, setLoading] = useState<boolean>(true);

  const serverStatus = useServerStatusStore((state) => state.serverStatus);

  useEffect(() => {
    async function getUserRole({ signal }: { signal: AbortSignal }) {
      setLoading(true);
      const { user } = await AuthService.getUser({ signal });

      if (!user) {
        setLoading(false);
        setRole("non-authenticated");
        return;
      }

      setLoading(false);
      setRole("authenticated");
    }

    const ctrl = new AbortController();

    if (serverStatus === "up") {
      getUserRole({ signal: ctrl.signal });
    }

    return () => {
      ctrl.abort();
    };
  }, [serverStatus]);

  return loading ? (
    <div className="flex items-center gap-1 p-1 px-3 hover:bg-neutral-200 transition-all duration-75 rounded-sm font-semibold text-neutral-700">
      Authenticating
      <Spinner className="w-4 h-4" />
    </div>
  ) : (
    VIEWS[role]
  );
}
