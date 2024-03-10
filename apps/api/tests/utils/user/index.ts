import { app } from "@/app";
import { Environment } from "@/config/environment";

import { NewUser } from "@/features/user/models";

export const correctUser = {
  name: "Huilen Solis",
  email: "huilensolis@skiff.com",
  password: Array(16).fill("h").join(""), // we send a password of 16 characteres
};

export async function createUser(): Promise<{
  user: NewUser | null;
  cookie: string | null;
}> {
  try {
    const res = await app.handle(
      new Request(`${Environment.API_URL}/auth/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...correctUser }),
      }),
    );
    const cookie = res.headers.getSetCookie()[0];

    if (!cookie) {
      console.log(await res.text());
      throw new Error("no token found in response trying to create a user");
    }
    return { user: correctUser, cookie };
  } catch (error) {
    console.log({ error });
    return { user: null, cookie: null };
  }
}
