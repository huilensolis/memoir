import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";
import cookie from "@elysiajs/cookie";
import { Environment } from "@/config/environment";

export const JwtPlugin = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: Environment.JWT_SECRET,
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
  .use(
    cookie({
      httpOnly: true,
      expires: new Date(
        new Date().getTime() +
          1000 /* 1 second */ *
            60 /* 1 minute */ *
            60 /* 1 hour */ *
            24 /* 1 day */ *
            14 /*14 days */,
      ),
      sameSite: "strict",
      secure: true,
      ...(Environment.NODE_ENV === "production" && {
        domain: Environment.WEB_DOMAIN,
      }),
    }),
  );
