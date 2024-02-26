import { describe, it, expect, beforeAll, afterAll } from "bun:test";

import { app } from "@/app";
import { createUser } from "../utils/user";
import { db } from "@/config/database";
import { Users } from "@/features/user/schema";
import { endpointPath } from "./index";

beforeAll(async () => await db.delete(Users));
afterAll(async () => await db.delete(Users));

describe("delete user on /user", () => {
	it("should delete correctly", async () => {
		const { user, cookie } = await createUser();

		if (!user || !cookie) throw new Error("user could not be created");

		const res = await app.handle(
			new Request(`${endpointPath}/`, {
				method: "DELETE",
				headers: { "content-type": "application/json", cookie: cookie },
				body: JSON.stringify({}),
			}),
		);

		expect(res.ok).toBeTrue();
		expect(res.status).toBe(201);

		const body = await res.json();

		expect(body).toBeObject();
		expect(body).toBeEmptyObject();
	});
});
