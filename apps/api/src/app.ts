import Elysia from "elysia";
import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Routes } from "./config/routing";
import { pluginCronCleanInactiveUsers } from "./shared/plugins/cron/remove-users";
import { helmet } from "elysia-helmet";

const app = new Elysia();
app.use(cors());
app.use(swagger());
app.use(helmet());

app.use(Routes);
app.use(pluginCronCleanInactiveUsers);

export { app };
