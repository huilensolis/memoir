import Elysia, { error, t } from "elysia";
import { UserAdapter } from "../../adapters";
import { AuthProvider } from "../../provider/auth";
import { rateLimit } from "elysia-rate-limit";
import { Environment } from "@/config/environment";
import { AuthPlugin } from "@/shared/plugins/auth";

export const AuthRouter = new Elysia()
  .group("/auth", (app) =>
    app
      .use(AuthPlugin)
      .use(
        rateLimit({
          duration: 1000 * 60 * 60 * 24, // a day
          max: Environment.NODE_ENV === "test" ? 1000 : 10,
          generator: (req, server) => server?.requestIP(req)?.address ?? "",
        }),
      )
      .post(
        "/sign-up",
        async ({ body, set, jwt, cookie: { access_token } }) => {
          try {
            const { name, email, password } = body;

            const { isEmailValid } = await AuthProvider.validateEmail(email);

            if (!isEmailValid) {
              set.status = "Bad Request";
              return { error: "invalid email" };
            }

            const { data, error } = await AuthProvider.signUp({
              user: { name, email, password },
            });

            if (!data?.user || error) {
              throw new Error();
            }

            const token = await jwt.sign({ user: { id: data.user.id } });

            set.status = 201;
            access_token.set({ value: token, path: "/" });
            return {};
          } catch (e) {
            return error("Unauthorized", {});
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
        async ({ body, jwt, set, cookie: { access_token } }) => {
          const { email, password } = body;

          try {
            const { error, data } = await AuthProvider.signIn({
              credentials: { email, password },
            });

            if (error || !data?.user) throw new Error("bad credentials");

            const token = await jwt.sign({ user: { id: data.user.id } });

            set.status = "Accepted";
            access_token.set({ value: token, path: "/" });
            return {};
          } catch (e) {
            return error("Unauthorized", {});
          }
        },
        {
          body: t.Object({
            email: t.String({ maxLength: 100, minLength: 5 }),
            password: t.String({ minLength: 14, maxLength: 20 }),
          }),
        },
      )
      .get("/sign-out", ({ cookie: { access_token }, set }) => {
        access_token.remove();
        set.status = 201;
        return {};
      }),
  )
  .group("/check-availability", (app) =>
    app
      .use(
        rateLimit({
          duration: 1000 * 60, // 1 minute
          max: 30,
          generator: (request, server) =>
            server?.requestIP(request)?.address ?? "",
        }),
      )
      .get(
        "/email/:email",
        async ({ params: { email }, set }) => {
          try {
            const { isEmailValid } = await AuthProvider.validateEmail(email);
            if (!isEmailValid) throw new Error();
          } catch (e) {
            return error("Bad Request", {});
          }

          try {
            const { isEmailAvailable } =
              await AuthProvider.checkIfEmailIsAvailable(email);
            if (!isEmailAvailable) throw new Error();

            set.status = "OK";
            return {};
          } catch (e) {
            return error("Conflict", {});
          }
        },
        {
          params: t.Object({
            email: t.String(),
          }),
        },
      ),
  )
  .group("/session", (app) =>
    app
      .use(AuthPlugin)
      .use(
        rateLimit({
          duration: 1000 * 60,
          max: 30,
          generator: (request, server) =>
            server?.requestIP(request)?.address ?? "",
        }),
      )
      .get("/token", async ({ cookie: { access_token }, set, jwt }) => {
        try {
          if (!access_token) {
            return error("Bad Request", {
              error: "we could not find the token on the cookies",
            });
          }

          const tokenPayload = await jwt.verify(access_token.value);

          if (!tokenPayload) {
            return error("Unauthorized", {
              error: "token signature is not valid",
            });
          }

          const { exp } = tokenPayload;

          if (!exp) {
            return error("Bad Request", {
              error: "we could not find the expiration date on token",
            });
          }

          if (exp - new Date().getTime() <= 0) {
            return error("Unauthorized", { error: "token expired" });
          }

          set.status = "Accepted";
          return {};
        } catch (e) {
          return error("Unauthorized", {
            error: "token expired or unauthorized",
          });
        }
      }),
  );
