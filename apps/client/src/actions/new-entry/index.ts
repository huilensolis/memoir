"use server";

import { EntryService } from "@/models/api/entry";
import { ClientRoutingService } from "@/models/routing/client";
import { getCookie } from "@/utils/getCookies";

export async function newEntry(): Promise<{
  newEntryId: string | null;
  error: boolean;
}> {
  try {
    const { cookie } = getCookie();

    if (!cookie) throw new Error("no cookie found in request headers");

    const { entryId, error } = await EntryService.createNewEntry({
      title: "Untitled",
      cookie,
    });

    if (!entryId || error) throw new Error("could not create entry");

    const route = new URL(process.env.NEXT_PUBLIC_SITE_URL as string);
    route.pathname = ClientRoutingService.app.entries.readById(entryId);

    return { newEntryId: entryId, error: false };
  } catch (error) {
    return { newEntryId: null, error: true };
  }
}
