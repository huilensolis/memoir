import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { helmet } from "elysia-helmet";
import { Environment } from "./config/environment";
import { Routes } from "./config/routing";
import { pluginCronCleanDeletedJournalEntries } from "./shared/plugins/cron/remove-entries";
import { pluginCronCleanInactiveUsers } from "./shared/plugins/cron/remove-users";

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
