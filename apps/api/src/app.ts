import Elysia from "elysia";
import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Routes } from "./config/routing";
import { pluginCronCleanInactiveUsers } from "./shared/plugins/cron/remove-users";
import { helmet } from "elysia-helmet";
import { Environment } from "./config/environment";

const app = new Elysia();
app.use(cors());
app.use(swagger({ path: "/docs", autoDarkMode: true }));
app.use(
  helmet({
    contentSecurityPolicy: Environment.NODE_ENV === "production" ? true : false,
  }),
);

app.use(Routes);
app.use(pluginCronCleanInactiveUsers);

export { app };
