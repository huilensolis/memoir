import Elysia, { t } from "elysia";
import { isAuthenticated } from "@/shared/middlewares/auth";

export const UserRouter = new Elysia().group("/user", (app) =>
  app
    .use(isAuthenticated)
    .get("/", async ({ set, user }) => {
      try {
        if (!user) throw new Error("user not found");

        set.status = "Found";
        return { user };
      } catch (error) {
        set.status = "Not Found";
        throw new Error("user not found");
      }
    })
    .delete("/", async ({ user, set }) => {
      try {
        if (!user) throw new Error("user not found");

        // delete user
      } catch (error) {
        set.status = "Internal Server Error";
        throw new Error("user not found");
      }
    }),
);
