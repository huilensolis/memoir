import Elysia from "elysia";
import { JwtPlugin } from "../../plugins";
import { TUserContext } from "./jwt.models";

export const isAuthenticated = (app: Elysia) =>
  app
    .use(JwtPlugin)
    .onBeforeHandle(async ({ cookie, jwt, set }) => {
      try {
        if (!cookie || !cookie.access_token)
          throw new Error("no token found on cookies");

        const { access_token } = cookie;

        const tokenPayload = await jwt.verify(access_token);

        if (tokenPayload === false) throw new Error("could not verify jwt");

        const { user, exp } = tokenPayload;

        if (!exp) throw new Error("no exp date found in token");

        if (exp - new Date().getTime() <= 0) throw new Error("jwt expired");

        if (!user) throw new Error("not user found");
      } catch (error) {
        set.status = "Unauthorized";
        set.headers = { "Content-Type": "application/json; utf8;" };
        return { error: "Unauthorized" };
      }
    })
    .resolve(async ({ jwt, cookie }) => {
      const { access_token } = cookie;

      const tokenPayload = await jwt.verify(access_token);

      if (tokenPayload === false) throw new Error("could not verify jwt");

      const { user } = tokenPayload;

      if (!user) throw new Error("no user found on jwt token");

      return { user: user as TUserContext };
    });
