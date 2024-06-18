import { getCookieMaxAge } from "@/config/cookies";
import { Environment } from "@/config/environment";
import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";

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
		path: "/",
		httpOnly: true,
		maxAge: getCookieMaxAge(),
		sameSite: Environment.NODE_ENV === "production" ? "strict" : "none",
		secure: true,
		...(Environment.NODE_ENV === "production" && {
			domain: Environment.ORIGIN,
		}),
	}),
);
