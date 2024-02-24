import Elysia, { t } from "elysia";
import { isAuthenticated } from "@/shared/middlewares/auth";
import { UserProvider } from "../../provider/user";
import { UserAdapter } from "../../adapters";
import { SafeUserSchema, UserSchema } from "../models/";
import { cleanKeysWithEmptyValue } from "@/shared/utils/objects/clean-keys";

export const UserRouter = new Elysia().group("/user", (app) =>
  app
    .use(isAuthenticated)
    .get(
      "/",
      async ({ set, user }) => {
        try {
          if (!user) throw new Error("user not found");

          const { data, error } = await UserProvider.getById({
            userId: user.id,
          });

          if (!data || !data.user || error)
            throw new Error("error getting user");

          const { user: unsafeUser } = data;

          const { user: safeUser } = UserAdapter.toSafeUser({
            user: unsafeUser,
          });

          set.status = "OK";
          return { user: safeUser };
        } catch (error) {
          set.status = "Internal Server Error";
          return {
            error:
              "the user may not been found, or may have an inactive / deleted account",
          };
        }
      },
      {
        response: {
          200: t.Object({
            user: SafeUserSchema,
          }),
          500: t.Object({ error: t.String() }),
        },
      },
    )
    .delete(
      "/",
      async ({ user, set }) => {
        try {
          if (!user) throw new Error("user not found");

          const { error } = await UserProvider.delete({ userId: user.id });

          if (error) throw new Error("error deleting user");

          set.status = "Created";
          console.log("sending response");
          return {};
        } catch (error) {
          set.status = "Internal Server Error";
          return {
            error:
              "thre user may not have been found or the delete operation failed",
          };
        }
      },
      {
        response: {
          201: t.Object({}),
          500: t.Object({ error: t.String() }),
        },
      },
    )
    .put(
      "/",
      async ({ body: { email, name, password }, user, set }) => {
        try {
          const { data, error: errorGettingUserByEmail } =
            await UserProvider.getByEmail({
              userEmail: user.email,
            });

          if (!data || !data.user || errorGettingUserByEmail)
            throw new Error("user not found");

          const unsafeUser = data.user;

          // we remove the undefined keys, so we dont delete those values on the database when updating
          const userBody = { email, name, password };
          const cleanUserBody =
            cleanKeysWithEmptyValue<typeof userBody>(userBody);
          const { error: errorUpdatingUser } = await UserProvider.update({
            userId: unsafeUser.id,
            user: cleanUserBody,
          });

          if (errorUpdatingUser) throw new Error("error updating user");

          set.status = "Created";
          return {};
        } catch (error) {
          console.log(error);
          set.status = "Internal Server Error";
          return { error: "error updating user" };
        }
      },
      {
        body: UserSchema,
        response: {
          201: t.Object({}),
          500: t.Object({ error: t.String() }),
        },
      },
    ),
);
