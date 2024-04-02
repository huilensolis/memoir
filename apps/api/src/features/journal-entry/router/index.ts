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
          const { data: newEntry, error } =
            await JournalEntryProvider.createEntry({
              entry: body,
              userId: user.id,
            });

          if (error || !newEntry)
            throw new Error(error ?? "error creating entry");

          set.status = "Created";
          return { id: newEntry.id };
        } catch (e) {
          return error("Internal Server Error", {});
        }
      },
      {
        body: JournalEntryInsertSchema,
        response: { 201: t.Object({ id: t.String() }), 500: t.Object({}) },
      },
    ),
  // .get("/", () => {}, { response: { 200: JournalEntryReadSchema } }),
);
