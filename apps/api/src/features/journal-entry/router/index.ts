import { isAuthenticated } from "@/shared/middlewares/auth";
import Elysia, { error, t } from "elysia";
import { JournalEntryInsertSchema } from "../models/joruanl-entry.models";
import { JournalEntryProvider } from "../providers";

export const JournalEntryRoutes = new Elysia().group(
  "/journal",
  (app) =>
    app.use(isAuthenticated).post(
      "/",
      async ({ user, body, set }) => {
        try {
          await JournalEntryProvider.createEntry({
            entry: body,
            userId: user.id,
          });

          set.status = "Created";
          return {};
        } catch (e) {
          console.log({ e });
          console.log("error hete asjdfkasdj ifajosdjfoasdjhofhasdhfasohd");
          return error("Internal Server Error", {});
        }
      },
      {
        body: JournalEntryInsertSchema,
        response: { 201: t.Object({}), 500: t.Object({}) },
      },
    ),
  // .get("/", () => {}, { response: { 200: JournalEntryReadSchema } }),
);
