"use client";

import { Button } from "@/components/ui/button";
import { AuthService } from "@/models/api/auth";
import { CryptographyCustomApi } from "@/models/cryptography";
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
      const cryptoApi = new CryptographyCustomApi();

      const doesClientHaveCryptoKey =
        await cryptoApi.doesClientHaveAStroredKey();

      if (!doesClientHaveCryptoKey) {
        await AuthService.signOut();
        router.push(ClientRoutingService.auth.signIn);
      }

      const currentKey = cryptoApi.keyIdInDb;

      const { success } = await cryptoApi.removeKey(currentKey);

      if (!success) throw new Error("could not remove key");

      await AuthService.signOut();
      router.push(ClientRoutingService.auth.signIn);
    } catch (error) {
      console.log({ error });
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
