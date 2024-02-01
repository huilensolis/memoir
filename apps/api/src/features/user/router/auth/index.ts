import { JwtPlugin } from "@/shared/plugins";
import Elysia, { t } from "elysia";
import { UserProvider } from "../../provider";
import { validateEmail } from "../../utils/validate-email";

export const AuthRouter = new Elysia().group("/auth", (app) =>
  app
    .use(JwtPlugin)
    .post(
      "/sign-up",
      async ({ body, set, jwt }) => {
        try {
          const { name, email, password } = body;

          const { isEmailValid } = await validateEmail(email);

          if (!isEmailValid) {
            set.status = "Bad Request";
            return { error: "invalid email" };
          }

          const { data, error } = await UserProvider.auth.signUp({
            user: { name, email, password },
          });

          if (!data || !data.user || error) {
            throw new Error();
          }
          const { user } = data;

          set.status = 201;
          return {
            token: await jwt.sign({ user }),
          };
        } catch (error) {
          set.status = "Internal Server Error";
          return { error: "something went wrong" };
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
          set.status = "Internal Server Error";
          return {
            error:
              "it looks like youre using bad credentials, or the account doesnt exist, or the server had an error",
          };
        }
      },
      {
        body: t.Object({
          email: t.String({ maxLength: 100, minLength: 5 }),
          password: t.String({ minLength: 14, maxLength: 20 }),
        }),
      },
    )
    .post("/token", async ({ cookie, set, jwt }) => {
      try {
        const cookieToken = cookie.acces_token;

        if (!cookieToken) {
          set.status = "Bad Request";
          return { error: "we could not find the token on the cookies" };
        }

        const tokenPayload = await jwt.verify(cookieToken);

        if (!tokenPayload) {
          set.status = "Unauthorized";
          return { error: "token signature is not valid" };
        }

        const { exp } = tokenPayload;

        if (!exp) {
          set.status = "Bad Request";
          return { error: "we could not find the expiration date on token" };
        }

        if (exp - new Date().getTime() <= 0) {
          set.status = "Unauthorized";
          return { error: "token expired" };
        }

        set.status = "Accepted";
        return;
      } catch (error) {
        console.log(error);
        set.status = "Unauthorized";
        return { error: "token expired or unauthorized" };
      }
    }),
);
