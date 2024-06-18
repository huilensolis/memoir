import { describe, expect, it } from "bun:test";

import { app } from "@/app";
import { getRandomString } from "@/tests/lib/random-values";
import { endpointPath } from "./index";

describe("All user endpoints are protected against unauthenticated requests", () => {
	describe("Should not be able to perform GET if no cookie sent in headers", async () => {
		const res = await app.handle(
			new Request(`${endpointPath}/`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					cookie: "",
				},
			}),
		);

		it("Should return status 401", () => {
			expect(res.status).toBe(401);
		});

		it("Should return empty body", async () => {
			const body = await res.json();
			expect(body).toBeEmptyObject();
		});
	});

	describe("Should not be able to perform PUT if no cookie is sent in headers", async () => {
		const res = await app.handle(
			new Request(`${endpointPath}/`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					cookie: "",
				},
				body: JSON.stringify({
					name: getRandomString({ length: 10 }),
					email: `${getRandomString({ length: 10 })}@gmail.com`,
					password: getRandomString({ length: 16 }),
				}),
			}),
		);

		it("Should return status 401", () => {
			expect(res.status).toBe(401);
		});

		it("Should return empty body", async () => {
			const body = await res.json();
			expect(body).toBeEmptyObject();
		});
	});

	describe("Should not be able to perform DELETE if no cookie is sent in headers", async () => {
		const res = await app.handle(
			new Request(`${endpointPath}/`, {
				method: "DELETE",
				headers: { "content-type": "application/json", cookie: "" },
				body: JSON.stringify({}),
			}),
		);

		it("Should return status 401", () => {
			expect(res.status).toBe(401);
		});

		it("Should return empty body", async () => {
			const body = await res.json();
			expect(body).toBeEmptyObject();
		});
	});
});
