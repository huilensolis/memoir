import { Elysia, t } from "elysia";
import { UserProvider } from "../provider";

export const UserRouter = new Elysia()
  .group("/auth", (app) =>
    app
      .post(
        "/sign-up",
        async ({ body }) => {
          try {
            const userId = await UserProvider.auth.signUp({ user: body });
            if (userId) {
              return userId;
            } else {
              return "";
            }
          } catch (error) {
            console.log(error);
          }
        },
        {
          body: t.Object({
            name: t.String({ maxLength: 50, minLength: 2 }),
            email: t.String({ maxLength: 100, minLength: 5 }),
            password: t.String({ minLength: 14, maxLength: 20 }),
          }),
        },
      )
      .post(
        "/sign-in",
        async ({ body }) => {
          const { email, password } = body;
          try {
            const { error, data } = await UserProvider.auth.signIn({
              credentials: { email, password },
            });
            if (error || !data || !data.user || !data.user)
              throw new Error("bad credentials");
            console.log(data);
            return data;
          } catch (error) {
            return error;
          }
        },
        {
          body: t.Object({
            email: t.String({ maxLength: 100, minLength: 5 }),
            password: t.String({ minLength: 14, maxLength: 20 }),
          }),
        },
      ),
  )
  .group("/manage", (app) =>
    app
      .put("/update/:userId", () => {}, {
        params: t.Object({
          userId: t.String(),
        }),
      })
      .put("/delete/:userId", () => {}, {
        params: t.Object({
          userId: t.String(),
        }),
      })
      .get(
        "/:userId",
        async ({ params }) => {
          try {
            const user = await UserProvider.manage.get({
              userId: params.userId,
            });
            if (user) return { user };
          } catch (error) {
            console.log(error);
          }
        },
        {
          params: t.Object({
            userId: t.String(),
          }),
        },
      ),
  );
