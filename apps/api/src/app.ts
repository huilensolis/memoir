import Elysia from "elysia";
import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Routes } from "./config/routing";
import { pluginCronCleanInactiveUsers } from "./shared/plugins/cron/remove-users";

const app = new Elysia();
app.use(cors());
app.use(swagger());

app.use(Routes);
app.use(pluginCronCleanInactiveUsers);

export { app };
