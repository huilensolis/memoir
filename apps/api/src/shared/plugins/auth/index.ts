import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";
import { Environment } from "@/config/environment";

export const AuthPlugin = new Elysia().use(
  jwt({
    name: "jwt",
    secret: Environment.JWT_SECRET,
    schema: t.Object({
      user: t.Object({
        id: t.String(),
      }),
    }),
    exp: new Date().getTime() + 1000 * 60 * 60 * 24 * 14, // 14 days in the future
  }),
);
