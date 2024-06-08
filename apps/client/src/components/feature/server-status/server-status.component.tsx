"use client";

import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

import { Spinner } from "@/components/ui/spinner";
import { ApiRoutingService } from "@/models/routing/api";
import { BadgeCheck } from "lucide-react";

function checkStatus() {
  // eslint-disable-next-line
  return new Promise(async (resolve, _reject) => {
    if (typeof document === "undefined") return resolve("");
    let isServerDown = true;
    while (isServerDown) {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve("");
        }, 2000),
      );
      try {
        const { status } = await axios.get(ApiRoutingService.routing.health, {
          timeout: 3000,
        });

        if (status !== 200) throw new Error("Unhealthy server");

        isServerDown = false;
        resolve("");
      } catch (error) {}
    }
  });
}

export function ServerStatus() {
  function showToaster() {
    toast.promise(checkStatus, {
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
  }

  useEffect(() => {
    showToaster();
  }, []);

  return null;
}
