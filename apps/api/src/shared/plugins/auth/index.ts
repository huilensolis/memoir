import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";
import { Environment } from "@/config/environment";

export const AuthPlugin = new Elysia({
  cookie: {
    httpOnly: true,
    expires: new Date(
      new Date().getTime() +
        1000 /* 1 second */ *
          60 /* 1 minute */ *
          60 /* 1 hour */ *
          24 /* 1 day */ *
          14 /*14 days */,
    ),
    sameSite: Environment.NODE_ENV === "production" ? "strict" : "none",
    secure: true,
    ...(Environment.NODE_ENV === "production" && {
      domain: Environment.WEB_DOMAIN,
    }),
  },
}).use(
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
