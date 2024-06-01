import Elysia from "elysia";
import swagger from "@elysiajs/swagger";
import { Routes } from "./config/routing";
import { pluginCronCleanInactiveUsers } from "./shared/plugins/cron/remove-users";
import { helmet } from "elysia-helmet";
import { Environment } from "./config/environment";
import { pluginCronCleanDeletedJournalEntries } from "./shared/plugins/cron/remove-entries";

const app = new Elysia();
// app.use(
//   cors({
//     origin: "google.com",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   }),
// );
app.use(swagger({ path: "/docs", autoDarkMode: true }));
app.use(
  helmet({
    contentSecurityPolicy: Boolean(Environment.NODE_ENV === "production"),
  }),
);

app.use(Routes);
app.use(pluginCronCleanInactiveUsers);
app.use(pluginCronCleanDeletedJournalEntries);

export { app };
