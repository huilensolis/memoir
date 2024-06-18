import { describe, expect, it } from "bun:test";
import { app } from "@/app";
import { EXAMPLE_DOCUMENT_CONTENT } from "@/tests/lib/constants";
import { createNewEntry } from "@/tests/lib/journal";
import { createUser } from "@/tests/lib/user";
import { endpointPath } from ".";

describe("Test PATCH method on journal entries endpoints", () => {
	describe("Succesfull request", async () => {
		const { cookie } = await createUser({});

		const { journalEntryId } = await createNewEntry(
			{ title: "untitled", content: EXAMPLE_DOCUMENT_CONTENT, word_count: 0 },
			cookie,
		);

		const res = await app.handle(
			new Request(`${endpointPath}/${journalEntryId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					cookie: cookie,
				},
				body: JSON.stringify({
					title: "test",
					content: EXAMPLE_DOCUMENT_CONTENT,
					word_count: 291,
				}),
			}),
		);

		it("Should return status code 201", () => {
			expect(res.status).toBe(201);
		});

		it("Should return empty object on body", async () => {
			const body = await res.json();

			expect(body).toBeEmptyObject();
		});
	});
});
