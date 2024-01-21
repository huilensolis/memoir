import Elysia from "elysia";
import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { UserRouter } from "./features/user/router";

const app = new Elysia().get("/", () => "Hello World");
app.use(cors());
app.use(swagger());

// routing
app.use(UserRouter);

export { app };
