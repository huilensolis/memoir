import { JwtPlugin } from "@/shared/plugins";
import Elysia, { t } from "elysia";
import { UserProvider } from "../../provider";

export const AuthRouter = new Elysia().group("/auth", (app) =>
  app
    .use(JwtPlugin)
    .post(
      "/sign-up",
      async ({ body, set, jwt }) => {
        try {
          const { data, error } = await UserProvider.auth.signUp({
            user: body,
          });

          if (!data || !data.user || error) {
            set.status = "Unauthorized";
            throw new Error();
          }
          const { user } = data;

          set.status = 201;
          return {
            token: await jwt.sign({ user }),
          };
        } catch (error) {
          throw new Error("something wen wrong");
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
      async ({ body, jwt, set }) => {
        const { email, password } = body;

        try {
          const { error, data } = await UserProvider.auth.signIn({
            credentials: { email, password },
          });

          if (error || !data || !data.user) throw new Error("bad credentials");

          const payload = await jwt.sign({ user: data.user });

          set.status = "OK";
          return { token: payload };
        } catch (error) {
          throw new Error(
            "it looks like youre using bad credentials, or the account doesnt exist, or the server had an error",
          );
        }
      },
      {
        body: t.Object({
          email: t.String({ maxLength: 100, minLength: 5 }),
          password: t.String({ minLength: 14, maxLength: 20 }),
        }),
      },
    ),
);
