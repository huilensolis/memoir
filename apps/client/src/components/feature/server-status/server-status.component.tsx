"use client";

import axios from "axios";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { Spinner } from "@/components/ui/spinner";
import { ApiRoutingService } from "@/models/routing/api";
import { BadgeCheck } from "lucide-react";
import { useServerStatusStore } from "@/stores/server-status";

export function ServerStatus() {
  const setServerStatus = useServerStatusStore(
    (state) => state.setServerStatus,
  );

  const serverStatus = useServerStatusStore((state) => state.serverStatus);

  async function checkServerStatus() {
    // eslint-disable-next-line no-async-promise-executor
    return await new Promise(async (resolve) => {
      do {
        try {
          const { status } = await axios.get(ApiRoutingService.routing.health, {
            timeout: 3000,
          });

          if (status !== 200) throw new Error("Unhealthy server");

          setServerStatus("up");
          resolve("");
        } catch (error) {}

        if (serverStatus === "down") {
          await new Promise((resolve) =>
            setTimeout(() => {
              resolve("");
            }, 2000),
          );
        }
        // eslint-disable-next-line no-unmodified-loop-condition
      } while (serverStatus === "down");
    });
  }

  // this is just for preventing the useeffect from calling toast.promise twice in strit mode
  const renderTime = useRef<number>(0);

  useEffect(() => {
    renderTime.current++;

    if (renderTime.current > 1) return;

    toast.promise(checkServerStatus(), {
      loading: (
        <article className="flex flex-col">
          <header className="flex items-center gap-2">
            <Spinner />
            <strong>Server is down</strong>
          </header>
          <p>
            The server is hosted on a free plan, which means that it turns off
            when it has no activity. <br /> <br /> it can take up to 50s to turn
            on the server.
          </p>
        </article>
      ),
      success: (
        <article className="flex flex-col">
          <header className="flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-neutral-950" />
            <strong>Server is up</strong>
          </header>
        </article>
      ),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
