import { eq } from "drizzle-orm";
import { db } from "../../../../config/database";
import { Users } from "../../schema";
import { PromiseReturnHanler } from "@/shared/models/promises";
import type { User } from "../../models";
import { updateUser } from "../../models/user.model";

export class UserProvider {
  static async getById({
    userId,
  }: {
    userId: string;
  }): PromiseReturnHanler<{ user: User }, Error | unknown> {
    try {
      const result = await db.select().from(Users).where(eq(Users.id, userId));

      if (!result || result.length === 0) throw new Error("User not found");

      const user = result[0];

      if (!user) throw new Error("User not found");

      return { data: { user }, error: null };
    } catch (error) {
      return { error: error, data: null };
    }
  }

  static async getByEmail({
    userEmail,
  }: {
    userEmail: string;
  }): PromiseReturnHanler<{ user: User }, Error | unknown> {
    try {
      const result = await db
        .select()
        .from(Users)
        .where(eq(Users.email, userEmail));

      if (!result || result.length === 0) throw new Error("User not found");

      const user = result[0];

      if (!user) throw new Error("User not found");

      return { data: { user }, error: null };
    } catch (error) {
      return { error: error, data: null };
    }
  }

  static async update({
    userId,
    user,
  }: {
    userId: string;
    user: updateUser;
  }): Promise<{ error: Error | null }> {
    try {
      await db
        .update(Users)
        .set({
          ...user,
        })
        .where(eq(Users.id, userId));

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }

  static async delete({
    userId,
  }: {
    userId: string;
  }): PromiseReturnHanler<null, Error> {
    try {
      await db
        .update(Users)
        .set({
          end_date: JSON.stringify(
            new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30), // 30 days in the future since today
          ),
        })
        .where(eq(Users.id, userId));
      return { error: null, data: null };
    } catch (error) {
      return { error: error as Error, data: null };
    }
  }
}
