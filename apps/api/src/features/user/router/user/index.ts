import Elysia, { t } from "elysia";
import { isAuthenticated } from "@/shared/middlewares/auth";
import { UserProvider } from "../../provider/manage";
import { UserAdapter } from "../../adapters";
import { userSchemaModelUpdate } from "../../models/user.model";

export const UserRouter = new Elysia().group("/user", (app) =>
  app
    .use(isAuthenticated)
    .get("/", async ({ set, user }) => {
      try {
        if (!user) throw new Error("user not found");

        const { data, error } = await UserProvider.getById({ userId: user.id });

        if (!data || !data.user || error) throw new Error("error getting user");

        const { user: unsafeUser } = data;

        const { user: activeUser } = UserAdapter.toOnlyActive({
          user: unsafeUser,
        });

        if (!activeUser) throw new Error("this user account is inactive");

        const { user: safeUser } = UserAdapter.toSafeUser({ user: unsafeUser });

        set.status = "Found";
        return { user: safeUser };
      } catch (error) {
        set.status = "Internal Server Error";
        return {
          error:
            "the user may not been found, or may have an inactive / deleted account",
        };
      }
    })
    .delete("/", async ({ user, set }) => {
      try {
        if (!user) throw new Error("user not found");

        const { error } = await UserProvider.delete({ userId: user.id });

        if (error) throw new Error("error deleting user");

        set.status = "Created";
        return {};
      } catch (error) {
        set.status = "Internal Server Error";
        return { error: "user not found" };
      }
    })
    .put(
      "/",
      async ({ body: { user: userBody }, user, set }) => {
        try {
          const { data, error: errorGettingUserByEmail } =
            await UserProvider.getByEmail({
              userEmail: user.email,
            });

          if (!data || !data.user || errorGettingUserByEmail)
            throw new Error("user not found");

          const unsafeUser = data.user;

          const { error: errorUpdatingUser } = await UserProvider.update({
            userId: unsafeUser.id,
            user: userBody,
          });

          if (errorUpdatingUser) throw new Error("error updating user");

          set.status = "Created";
          return {};
        } catch (error) {
          set.status = "Internal Server Error";
          return { error: "error updating user" };
        }
      },
      {
        body: t.Object({
          user: userSchemaModelUpdate,
        }),
      },
    ),
);
