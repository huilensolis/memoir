import { isAuthenticated } from "@/shared/middlewares/auth";
import Elysia, { error, t } from "elysia";
import {
  JournalEntryInsertSchema,
  JournalEntrySafeSchema,
} from "../models/joruanl-entry.models";
import { JournalEntryProvider } from "../providers";
import { JournalEntryAdapter } from "../adapters";

export const JournalEntryRoutes = new Elysia().group("/journal", (app) =>
  app
    .use(isAuthenticated)
    .post(
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
    )
    .get(
      "/",
      async ({ user, set }) => {
        try {
          const unsafeUserJournalEntries =
            await JournalEntryProvider.getEntriesListByUserId(user.id);

          if (typeof unsafeUserJournalEntries.length === "undefined")
            throw new Error("could not found user journal entries");

          const safeJournalEntries = unsafeUserJournalEntries.map((entry) => {
            const { safeEntry } = JournalEntryAdapter.toSafeEntry(entry);
            return safeEntry;
          });

          set.status = "OK";
          return safeJournalEntries;
        } catch (e) {
          return error("Internal Server Error", {});
        }
      },
      {
        response: { 200: JournalEntrySafeSchema, 500: t.Object({}) },
      },
    )
    .delete(
      "/:id",
      async ({ params: { id: entryId }, set, user }) => {
        try {
          const { error } = await JournalEntryProvider.deleteEntry({
            entryId,
            userId: user.id,
          });

          if (error) throw new Error(error);

          set.status = "Created";
          return {};
        } catch (e) {
          return error("Internal Server Error", {});
        }
      },
      { params: t.Object({ id: t.String() }) },
    )
    .patch(
      "/:id",
      async ({ params: { id }, set, body }) => {
        try {
          const { error } = await JournalEntryProvider.updateEntry({
            entryId: id,
            values: body,
          });

          if (error) throw new Error(error);

          set.status = "Created";
          return {};
        } catch (e) {
          return error("Internal Server Error", {});
        }
      },
      {
        params: t.Object({ id: t.String() }),
        body: JournalEntryInsertSchema,
        response: {
          201: t.Object({}),
          500: t.Object({}),
        },
      },
    ),
);
