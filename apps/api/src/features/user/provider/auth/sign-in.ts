import { eq } from "drizzle-orm";
import { db } from "@/config/database";
import { type User } from "../../models/user.model";
import { Users } from "../../schema";
import { type SafeUser } from "../../models/user.model";

type UserCredentials = { email: User["email"]; password: User["password"] };

export async function signIn({
  credentials,
}: {
  credentials: UserCredentials;
}): Promise<{
  data: { user: SafeUser } | null;
  error: Error | null;
}> {
  const { email, password } = credentials;

  try {
    const result = await db.select().from(Users).where(eq(Users.email, email));

    if (!result || result.length === 0) {
      throw new Error("no user found");
    }

    const user = result[0];

    const doesPasswordMatch = await Bun.password.verify(
      password,
      user.password,
      "bcrypt",
    );
    if (!doesPasswordMatch) throw new Error("password does not match");

    const safeUser: SafeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return Promise.resolve({ data: { user: safeUser }, error: null });
  } catch (error) {
    console.log(error);
    return Promise.reject({ data: null, error: Error });
  }
}
