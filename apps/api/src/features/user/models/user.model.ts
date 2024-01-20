import { Users } from "../schemas";

export type User = typeof Users.$inferSelect;
export type NewUser = typeof Users.$inferInsert;
