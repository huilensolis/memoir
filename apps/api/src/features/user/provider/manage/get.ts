import { eq } from "drizzle-orm";
import { db } from "../../../../config/database";
import { Users } from "../../schema";

export async function getUser({ userId }: { userId: string }) {
  try {
    const result = await db.select().from(Users).where(eq(Users.id, userId));
    return Promise.resolve(result);
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
}
