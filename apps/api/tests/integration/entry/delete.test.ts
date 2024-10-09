import { describe, expect, it, test } from "bun:test";
import { app } from "@/app";
import { EXAMPLE_DOCUMENT } from "@/tests/lib/constants";
import { createNewEntry } from "@/tests/lib/entry";
import { createUser } from "@/tests/lib/user";
import { endpointPath } from ".";

describe("Test DELETE method on entries endpoints", () => {
	describe("Delete own entry succesfully", async () => {
		const { cookie } = await createUser({});

		const { EntryId } = await createNewEntry(EXAMPLE_DOCUMENT, cookie);

		if (!EntryId) throw new Error("Entry not created");

		const res = await app.handle(
			new Request(`${endpointPath}/${EntryId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					cookie: cookie,
				},
			}),
		);

		it("Should return status 202", () => {
			expect(res.status).toBe(202);
		});

		it("Should return empty object on body response", async () => {
			const body = await res.json();

			expect(body).toBeEmptyObject();
		});
	});

	test.todo("Delete entry not ownd by user", async () => {
		it("Should return status 401", () => {});

		it("Should return empty object on body response", async () => {});
	});

	describe("should not return deleted entry after delete", async () => {
		const { cookie } = await createUser({});

		const { EntryId } = await createNewEntry(EXAMPLE_DOCUMENT, cookie);

		if (!EntryId) throw new Error("entry not created");

		await app.handle(
			new Request(`${endpointPath}/${EntryId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					cookie: cookie,
				},
			}),
		);

		const res = await app.handle(
			new Request(`${endpointPath}/${EntryId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					cookie: cookie,
				},
			}),
		);

		it("should not return 200", () => {
			expect(res.status).not.toBe(200);
		});

		it("should not return entry", async () => {
			const body = await res.json();

			expect(body).toBeEmptyObject();
		});
	});
});
