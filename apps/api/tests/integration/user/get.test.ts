import { afterAll, beforeEach, describe, expect, it } from "bun:test";
import { Value } from "@sinclair/typebox/value";

import { app } from "@/app";
import { db } from "@/config/database";
import { SafeUserSchema } from "@/features/user/router/models/";
import { Users } from "@/features/user/schema";
import { createUser } from "../../lib/user";
import { endpointPath } from "./index";

beforeEach(async () => await db.delete(Users));
afterAll(async () => await db.delete(Users));

describe("Get user on path /user", () => {
	describe("Get user succesfully", async () => {
		const { cookie } = await createUser({});

		const res = await app.handle(
			new Request(`${endpointPath}/`, {
				method: "GET",
				headers: { "Content-Type": "application/json", cookie: cookie },
			}),
		);

		it("Should return 200 status code", async () => {
			expect(res.status).toBe(200);
		});

		it("Should return safe user on response body", async () => {
			const body = await res.json();

			const isResponseValid = Value.Check(SafeUserSchema, body);

			expect(isResponseValid).toBeTrue();
		});
	});

	describe("Error getting user", async () => {
		await createUser({});

		const res = await app.handle(
			new Request(`${endpointPath}/`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}),
		);

		it("Should get rejected if no cookies is found in headers", async () => {
			expect(res.status).toBe(401);
		});

		it("Should return empty obejct if no cookies found in headers", async () => {
			const body = await res.json();
			expect(body).toBeEmptyObject();
		});
	});
});
