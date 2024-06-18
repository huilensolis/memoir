import { app } from "@/app";
import { Environment } from "@/config/environment";

import type { NewUser } from "@/features/user/models";
import { getRandomString } from "../random-values";

type TProps = {
	customEmail?: string;
};

type TReturn = {
	user: NewUser;
	cookie: string;
};

export async function createUser({
	customEmail = undefined,
}: TProps): Promise<TReturn> {
	try {
		const newUser: NewUser = {
			name: getRandomString({ length: 8 }),
			email: customEmail ?? `${getRandomString({ length: 8 })}@gmail.com`,
			password: getRandomString({ length: 16 }), // we send a password of 16 characteres
		};

		const res = await app.handle(
			new Request(`${Environment.API_URL}/auth/sign-up`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...newUser }),
			}),
		);
		const cookie = res.headers.getSetCookie()[0];

		if (!cookie) {
			throw new Error("no token found in response trying to create a user");
		}
		return { user: newUser, cookie };
	} catch (error) {
		console.log({ error });
		throw new Error("error creating user");
	}
}
