import { t } from "elysia";
import { Users } from "../schema/index";

export const userSchemaModel = t.Object({
  name: t.String({ maxLength: 50 }),
  email: t.String({ maxLength: 100 }),
  password: t.Optional(t.String({ maxLength: 70, minLength: 14 }), true),
});

export const userSchemaModelUpdate = t.Object({
  name: t.Optional(userSchemaModel.properties.name, true),
  email: t.Optional(userSchemaModel.properties.email, true),
  password: t.Optional(userSchemaModel.properties.password, true),
});

export type User = typeof Users.$inferSelect;
export type NewUser = typeof Users.$inferInsert;
export type SafeUser = Omit<User, "password">;
export type updateUser = typeof userSchemaModelUpdate.static;
