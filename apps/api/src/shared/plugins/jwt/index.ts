import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";
import { environment } from "../../../config/database/env-variables";
import cookie from "@elysiajs/cookie";

export const JwtPlugin = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: environment.jwtSecret,
      schema: t.Object({
        user: t.Object({
          id: t.String(),
          name: t.String(),
          email: t.String(),
        }),
      }),
      exp: new Date().getTime() + 1000 * 60 * 60 * 24 * 14, // 14 days in the future
    }),
  )
  .use(cookie({ httpOnly: true }));
