"use client";

import { Button } from "@/components/ui/button";
import { AuthService } from "@/models/api/auth";
import { ClientRoutingService } from "@/models/routing/client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignOutBtn() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function signOut() {
    setLoading(true);

    try {
      await AuthService.signOut();
      router.push(ClientRoutingService.auth.signIn);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="outline"
      loading={loading}
      onClick={signOut}
      className="w-full flex gap-2"
    >
      <LogOut />
      Sign Out
    </Button>
  );
}
