import { describe, expect, it, test } from "bun:test";

import { app } from "@/app";
import { EXAMPLE_DOCUMENT } from "@/tests/lib/constants";
import { createNewEntry } from "@/tests/lib/entry";
import { createUser } from "@/tests/lib/user";
import { endpointPath } from ".";

describe("Entry guard", () => {
	describe("Unauthenticated user should not be able to perform requests to endpoint", () => {
		test.todo("Should not be able to perform PATCH", async () => {
			const res = await app.handle(
				new Request(`${endpointPath}`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json; charset=utf-8",
						Cookie: "not-a-cookie",
					},
					body: JSON.stringify(EXAMPLE_DOCUMENT),
				}),
			);

			it("should return 401 status code", async () => {
				expect(res.status).toBe(401);
			});

			it("should return empty object ton body response", async () => {
				const body = await res.json();

				expect(body).toBeEmptyObject();
			});
		});

		describe("Should not be able to perform GET", async () => {
			const { cookie } = await createUser({});

			await createNewEntry(EXAMPLE_DOCUMENT, cookie);

			const res = await app.handle(
				new Request(`${endpointPath}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json; charset=utf-8",
						Cookie: "not-a-cookie",
					},
				}),
			);

			it("should return 401 status code", async () => {
				expect(res.status).toBe(401);
			});

			it("should return empty object ton body response", async () => {
				const body = await res.json();
				expect(body).toBeEmptyObject();
			});
		});
		describe("Should not be able to perform DELETE", async () => {
			const { cookie } = await createUser({});

			const { EntryId } = await createNewEntry(EXAMPLE_DOCUMENT, cookie);

			if (!EntryId) throw new Error("entry not created");

			const res = await app.handle(
				new Request(`${endpointPath}/${EntryId}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json; charset=utf-8",
						cookie: "not-a-cookie",
					},
				}),
			);

			it("should return 401 status code", async () => {
				expect(res.status).toBe(401);
			});

			it("should return empty object ton body response", async () => {
				const body = await res.json();
				expect(body).toBeEmptyObject();
			});
		});
		describe("Should not be able to perform POST", async () => {
			const res = await app.handle(
				new Request(`${endpointPath}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json; charset=utf-8",
						cookie: "not-a-cookie",
					},
					body: JSON.stringify(EXAMPLE_DOCUMENT),
				}),
			);

			it("should return 401 status code", async () => {
				expect(res.status).toBe(401);
			});

			it("should return empty object ton body response", async () => {
				const body = await res.json();

				expect(body).toBeEmptyObject();
			});
		});
	});

	test.todo(
		"User should not be able to get private entry of other user",
		async () => {},
	);
});
