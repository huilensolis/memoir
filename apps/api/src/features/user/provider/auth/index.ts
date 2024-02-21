import EmailValidator from "email-validator";
import { eq } from "drizzle-orm";
import { db } from "../../../../config/database";
import { Users } from "../../schema";
import { NewUser, User } from "../../models/user.model";

export class AuthProvider {
  static async signUp({
    user,
  }: {
    user: NewUser;
  }): Promise<{ data: { user: User } | null; error: Error | null }> {
    const { email, name, password } = user;

    try {
      const { isEmailAvailable } =
        await AuthProvider.checkIfEmailIsAvailable(email);

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
      return Promise.reject({ error, data: null });
    }
  }

  static async signIn({
    credentials,
  }: {
    credentials: { email: User["email"]; password: User["password"] };
  }): Promise<{
    data: { user: User } | null;
    error: Error | null;
  }> {
    const { email, password } = credentials;

    try {
      const result = await db
        .select()
        .from(Users)
        .where(eq(Users.email, email));

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

      return Promise.resolve({ data: { user }, error: null });
    } catch (error) {
      return Promise.reject({ data: null, error: Error });
    }
  }

  static async checkIfEmailIsAvailable(
    email: string,
  ): Promise<{ isEmailAvailable: boolean }> {
    const result = await db.select().from(Users).where(eq(Users.email, email));
    if (!result || result.length === 0)
      return Promise.resolve({ isEmailAvailable: true });
    else return Promise.resolve({ isEmailAvailable: false });
  }

  static async validateEmail(email: string) {
    const emailValidation = EmailValidator.validate(email);

    return {
      isEmailValid: Boolean(emailValidation),
    };
  }
}
