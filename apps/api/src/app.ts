import Elysia from "elysia";
import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Routes } from "./config/routing";

const app = new Elysia();
app.use(cors());
app.use(swagger());

app.use(Routes);

export { app };
