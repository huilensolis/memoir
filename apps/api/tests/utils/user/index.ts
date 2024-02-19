import { app } from "@/app";

import { correctUser } from "../../auth/index.test";
import { NewUser } from "@/features/user/models";

export async function createUser(): Promise<{
  user: NewUser | null;
  cookie: string | null;
}> {
  try {
    const res = await app.handle(
      new Request("http://localhost:3000/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...correctUser }),
      }),
    );

    const cookie = res.headers.getSetCookie()[0];

    if (!cookie)
      throw new Error("no token found in response trying to create a user");

    return { user: correctUser, cookie };
  } catch (error) {
    console.log({ error });
    return { user: null, cookie: null };
  }
}
