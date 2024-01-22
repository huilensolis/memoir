import { eq } from "drizzle-orm";
import { db } from "../../../../config/database";
import { type User } from "../../models";
import { Users } from "../../schema";
import { SafeUser } from "../../models/user.model";

type UserCredentials = { email: User["email"]; password: User["password"] };

export async function signIn({
  credentials,
}: {
  credentials: UserCredentials;
}): Promise<{
  data: { user: SafeUser; token?: string } | null;
  error: Error | null;
}> {
  const { email, password } = credentials;

  try {
    const result = await db.select().from(Users).where(eq(Users.email, email));

    if (!result || result.length === 0) {
      throw new Error("no user found");
    }

    const doesPasswordMatch = await Bun.password.verify(
      password,
      result[0].password,
      "bcrypt",
    );
    if (!doesPasswordMatch) throw new Error("password does not match");

    const safeUser: SafeUser = {
      id: result[0].id,
      name: result[0].name,
      email: result[0].email,
    };

    return Promise.resolve({ data: { user: safeUser }, error: null });
  } catch (error) {
    console.log(error);
    return Promise.reject({ data: null, error: Error });
  }
}
