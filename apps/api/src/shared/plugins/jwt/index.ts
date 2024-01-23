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
    }),
  )
  .use(cookie({ httpOnly: true }));
