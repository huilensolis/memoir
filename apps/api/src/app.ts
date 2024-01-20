import Elysia from "elysia";
import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";

const app = new Elysia().get("/", () => "Hello World");
app.use(cors());
app.use(swagger());

export { app };
