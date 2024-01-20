import Elysia from "elysia";

const app = new Elysia().get("/", () => "Hello World");

export { app };
