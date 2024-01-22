import { Users } from "../schema/index";

export type User = typeof Users.$inferSelect;
export type NewUser = typeof Users.$inferInsert;
export type SafeUser = Omit<User, "password">;
