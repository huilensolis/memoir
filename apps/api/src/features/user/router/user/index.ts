import Elysia, { error, t } from "elysia";
import { isAuthenticated } from "@/shared/middlewares/auth";
import { UserProvider } from "../../providers/user";
import { UserAdapter } from "../../adapters";
import { SafeUserSchema, UserSchema } from "../models/";
import { cleanKeysWithEmptyValue } from "@/shared/utils/objects/clean-keys";
import { rateLimit } from "elysia-rate-limit";
import { Environment } from "@/config/environment";

export const UserRouter = new Elysia().group("/user", (app) =>
  app
    .use(isAuthenticated)
    .use(
      rateLimit({
        duration: 6000,
        max: Environment.NODE_ENV === "test" ? 200 : 20,
        generator: (req, server) => server?.requestIP(req)?.address ?? "",
      }),
    )
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
          return { ...safeUser };
        } catch (e) {
          return error("Internal Server Error", {});
        }
      },
      {
        response: {
          200: SafeUserSchema,
          500: t.Object({}),
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
          return {};
        } catch (e) {
          return error("Internal Server Error", {});
        }
      },
      {
        response: {
          201: t.Object({}),
          500: t.Object({}),
        },
      },
    )
    .put(
      "/",
      async ({ body: { email, name, password }, user, set }) => {
        try {
          const { data, error: errorGettingUserByEmail } =
            await UserProvider.getById({
              userId: user.id,
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
        } catch (e) {
          return error("Internal Server Error", {});
        }
      },
      {
        body: UserSchema,
        response: {
          201: t.Object({}),
          500: t.Object({}),
        },
      },
    ),
);
