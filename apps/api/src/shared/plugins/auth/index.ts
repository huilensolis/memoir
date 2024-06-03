import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";
import { Environment } from "@/config/environment";
import { getCookieMaxAge } from "@/config/cookies";

export const AuthPlugin = new Elysia().use(
  jwt({
    name: "jwt",
    secret: Environment.JWT_SECRET,
    schema: t.Object({
      user: t.Object({
        id: t.String(),
      }),
    }),
    exp: getCookieMaxAge(),
  }),
);
