"use client";

import { CryptographyCustomApi } from "@/models/cryptography";
import { ClientRoutingService } from "@/models/routing/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function CheckForClientKeys() {
  const router = useRouter();

  useEffect(() => {
    async function checkKeys() {
      const cryptoApi = new CryptographyCustomApi();
      const doesClientHaveCRyptoKey =
        await cryptoApi.doesClientHaveAStroredKey();

      if (!doesClientHaveCRyptoKey) {
        router.push(ClientRoutingService.app.keys.generate);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    checkKeys();
  }, []);

  return <></>;
}
