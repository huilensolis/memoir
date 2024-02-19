import { eq } from "drizzle-orm";
import { db } from "../../../../config/database";
import { Users } from "../../schema";
import { PromiseReturnHanler } from "@/shared/models/promises";
import { User } from "../../models";

export class UserProvider {
  constructor() {}

  static async get({
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
}
