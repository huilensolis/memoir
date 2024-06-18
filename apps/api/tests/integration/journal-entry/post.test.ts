import { describe, expect, it } from "bun:test";
import { app } from "@/app";
import { EXAMPLE_DOCUMENT_CONTENT } from "@/tests/lib/constants";
import { createUser } from "@/tests/lib/user";
import { endpointPath } from ".";

describe("Test POST method on journal entries endpoints", () => {
	describe("Journal Entry created succesfully", async () => {
		const { cookie } = await createUser({});

		const res = await app.handle(
			new Request(`${endpointPath}`, {
				method: "POST",
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

		it("should return 201 status code", async () => {
			expect(res.status).toBe(201);
		});

		describe("return body", async () => {
			const body: { id: string } = await res.json();

			it("should return object on body response", () => {
				expect(body).toBeObject();
			});

			it("should return new entry id on body response", () => {
				expect(body).toContainKey("id");
				expect(body.id).toBeString();
			});
		});
	});

	describe("Incorrect schema on body json", async () => {
		const { cookie } = await createUser({});

		const res = await app.handle(
			new Request(`${endpointPath}/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					cookie: cookie,
				},
				body: JSON.stringify({
					title: 1233,
					content: "asdfas",
					word_count: "asdf",
				}),
			}),
		);

		it("should return 400 status code", async () => {
			expect(res.status).toBe(400);
		});

		it("should return error message", async () => {
			const body = await res.json();

			expect(body).toContainKey("error");
		});
	});
});
