import { app } from "@/app";
import { endpointPath } from "./index";
import { describe, it, expect, beforeEach, afterAll } from "bun:test";
import { db } from "@/config/database";
import { Users } from "@/features/user/schema";
import { correctUser } from "../utils/user";

beforeEach(async () => await db.delete(Users));
afterAll(async () => await db.delete(Users));

describe("sign up tests", () => {
	it("should create a user correctly", async () => {
		const res = await app.handle(
			new Request(`${endpointPath}/sign-up`, {
				method: "POST",
				headers: { "Content-Type": "application/json; charset=utf-8" },
				body: JSON.stringify({ ...correctUser }),
			}),
		);

		const body = await res.json();

		const setCookie = res.headers.getSetCookie();
		const cookie = setCookie[0];

		expect(res.ok).toBe(true);
		expect(res.status).toBe(201);

		expect(body).toBeObject();
		expect(body).toBeEmptyObject();

		expect(cookie).toBeString();
		expect(cookie).toStartWith("access_token=");
	});

	it("should return an error if the email is not a email", async () => {
		const res = await app.handle(
			new Request(`${endpointPath}/sign-up`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: correctUser.name,
					password: correctUser.password,
					email: "notAnEmail",
				}),
			}),
		);

		const body = await res.json();

		const setCookie = res.headers.getSetCookie();
		const cookie = setCookie[0];

		expect(res.ok).toBeFalse();
		expect(res.status).toBe(400);

		expect(body).toContainKey("error");

		expect(cookie).toBeUndefined();
	});

	it("should return an error if the email format is missing domain", async () => {
		const res = await app.handle(
			new Request(`${endpointPath}/sign-up`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: correctUser.name,
					password: correctUser.password,
					email: "test@gmail",
				}),
			}),
		);

		const body = await res.json();

		const setCookie = res.headers.getSetCookie();
		const cookie = setCookie[0];

		expect(res.ok).toBeFalse();
		expect(res.status).toBe(400);

		expect(body).toContainKey("error");

		expect(cookie).toBeUndefined();
	});
});
