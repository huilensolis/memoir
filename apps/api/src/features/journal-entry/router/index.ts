import { isAuthenticated } from "@/shared/middlewares/auth";
import Elysia, { error, t } from "elysia";
import { JournalEntryAdapter } from "../adapters";
import {
  JournalEntryInsertSchema,
  JournalEntrySafeSchema,
} from "../models/joruanl-entry.models";
import { JournalEntryProvider } from "../providers";

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

          const safeJournalEntries = unsafeUserJournalEntries.map((entry) => {
            const { entry: notDeletedEntry } =
              JournalEntryAdapter.toNotDeleted(entry);

            if (!notDeletedEntry) {
              throw new Error("entry is deleted");
            }

            const { safeEntry } =
              JournalEntryAdapter.toSafeEntry(notDeletedEntry);

            return safeEntry;
          });

          set.status = "OK";
          return safeJournalEntries;
        } catch (e) {
          return error("Internal Server Error", {});
        }
      },
      {
        response: {
          200: t.Array(JournalEntrySafeSchema),
          500: t.Object({}),
        },
      },
    )
    .get(
      "/:id",
      async ({ user, error, set, params }) => {
        try {
          const journalEntry = await JournalEntryProvider.getPrivateEntryById({
            entryId: params.id,
            userId: user.id,
          });

          if (!journalEntry) {
            return error("Not Found", {});
          }

          const { entry: notDeletedEntry } =
            JournalEntryAdapter.toNotDeleted(journalEntry);

          if (!notDeletedEntry) {
            throw new Error("Entry Deleted");
          }

          const { safeEntry } =
            JournalEntryAdapter.toSafeEntry(notDeletedEntry);

          set.status = "OK";
          return safeEntry;
        } catch (e) {
          return error("Not Found", {});
        }
      },
      {
        params: t.Object({ id: t.String() }),
        response: { 200: JournalEntrySafeSchema, 404: t.Object({}) },
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

          set.status = "Accepted";
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
