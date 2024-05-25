import { EntryService } from "@/models/api/entry";
import { ClientRoutingService } from "@/models/routing/client";
import { getCookie } from "@/utils/getCookies";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { cookie } = getCookie();

    if (!cookie) throw new Error("no cookie found in request headers");

    const { entryId, error } = await EntryService.createNewEntry({
      title: "Untitled",
      cookie,
    });

    if (!entryId || error) throw new Error("could not create entry");

    const entryRoute = new URL(req.url);
    entryRoute.pathname = ClientRoutingService.app.entries.readById(entryId);

    return NextResponse.redirect(entryRoute);
  } catch (error) {
    const originRoute = new URL(req.url);

    originRoute.pathname = ClientRoutingService.app.home;

    originRoute.searchParams.set(
      "message",
      "There has been an error, we could not create the new entry",
    );

    return NextResponse.redirect(originRoute);
  }
}
