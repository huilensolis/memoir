"use server";

import { revalidatePath } from "next/cache";

export async function cleanCache(
  path: string,
  type: "layout" | "page" = "page",
) {
  console.log("cleaning cache of ", path);
  revalidatePath(path, type);
}
