import { AuthPlugin } from "@/shared/plugins/auth";
import Elysia, { error } from "elysia";
import { TUserContext } from "./jwt.models";

export const isAuthenticated = (app: Elysia) =>
	app
		.use(AuthPlugin)
		.onBeforeHandle(
			{ as: "scoped" },
			async ({ cookie: { access_token }, jwt }) => {
				try {
					if (!access_token) throw new Error("no token found on cookies");

					const tokenPayload = await jwt.verify(access_token.value);

					if (tokenPayload === false) throw new Error("could not verify jwt");

					const { user, exp } = tokenPayload;

					if (!exp) throw new Error("no exp date found in token");

					if (exp - new Date().getTime() <= 0) throw new Error("jwt expired");

					if (!user?.id) throw new Error("no user found in token payload");
				} catch (e) {
					return error("Unauthorized", {});
				}
			},
		)
		.resolve({ as: "scoped" }, async ({ jwt, cookie: { access_token } }) => {
			const tokenPayload = await jwt.verify(access_token.value);

			if (tokenPayload === false) throw new Error("could not verify jwt");

			const { user } = tokenPayload;

			if (!user?.id) throw new Error("no user found on jwt token");

			return { user: user as TUserContext };
		});
