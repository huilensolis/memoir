import { describe, expect, it } from "bun:test";
import { app } from "@/app";
import { EXAMPLE_DOCUMENT } from "@/tests/lib/constants";
import { createNewEntry } from "@/tests/lib/entry";
import { createUser } from "@/tests/lib/user";
import { endpointPath } from ".";

describe("Test PATCH method on entries endpoints", () => {
	describe("Succesfull request", async () => {
		const { cookie } = await createUser({});

		const { EntryId } = await createNewEntry(EXAMPLE_DOCUMENT, cookie);

		const res = await app.handle(
			new Request(`${endpointPath}/${EntryId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					cookie: cookie,
				},
				body: JSON.stringify(EXAMPLE_DOCUMENT),
			}),
		);

		it("Should return status code 204", () => {
			expect(res.status).toBe(204);
		});

		it("Should return empty object on body", async () => {
			const body = await res.json();

			expect(body).toBeEmptyObject();
		});
	});
});
