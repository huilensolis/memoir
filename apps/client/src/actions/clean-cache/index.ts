"use server";

import { revalidatePath } from "next/cache";

export async function cleanCache(
    path: string,
    type: "layout" | "page" = "page",
) {
    revalidatePath(path, type);

    console.log('revalidating path:', path)
}
