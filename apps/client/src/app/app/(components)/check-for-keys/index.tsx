"use client";

import { CryptographyCustomApi } from "@/models/cryptography";
import { ClientRoutingService } from "@/models/routing/client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function CheckForClientKeys() {
    const router = useRouter();

    const currentPath = usePathname();

    useEffect(() => {
        async function checkKeys() {
            const cryptoApi = new CryptographyCustomApi();
            const doesClientHaveCRyptoKey =
                await cryptoApi.doesClientHaveAStroredKey();

            if (!doesClientHaveCRyptoKey) {
                if (!currentPath.startsWith(ClientRoutingService.app.keys.home))
                    router.push(ClientRoutingService.app.keys.home);
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        checkKeys();
    }, [currentPath]);

    return <></>;
}
