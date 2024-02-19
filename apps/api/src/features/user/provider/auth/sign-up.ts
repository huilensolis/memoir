import { eq } from "drizzle-orm";
import { db } from "../../../../config/database";
import { Users } from "../../schema";
import { NewUser, User } from "../../models/user.model";

export async function signUp({
  user,
}: {
  user: NewUser;
}): Promise<{ data: { user: User } | null; error: Error | null }> {
  const { email, name, password } = user;

  try {
    const { isEmailAvailable } = await checkIfEmailIsAvailable(email);

    if (!isEmailAvailable) throw new Error("Email not available");

    const hashedPassword = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 10,
    });

    const result = await db
      .insert(Users)
      .values({ name, email, password: hashedPassword })
      .returning();

    return Promise.resolve({ data: { user: result[0] }, error: null });
  } catch (error) {
    console.log(error);
    return Promise.reject({ error, data: null });
  }
}

async function checkIfEmailIsAvailable(
  email: string,
): Promise<{ isEmailAvailable: boolean }> {
  const result = await db.select().from(Users).where(eq(Users.email, email));
  if (!result || result.length === 0)
    return Promise.resolve({ isEmailAvailable: true });
  else return Promise.resolve({ isEmailAvailable: false });
}
