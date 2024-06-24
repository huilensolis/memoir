import { isAuthenticated } from "@/shared/middlewares/auth";
import Elysia, { error, t } from "elysia";
import { EntryAdapter } from "../adapters";
import { EntryInsertSchema, EntrySafeSchema } from "../models/entry.models";
import { EntryProvider } from "../providers";

export const EntryRoutes = new Elysia().group("/entry", (app) =>
  app
    .use(isAuthenticated)
    .post(
      "/",
      async ({ user, body, set }) => {
        try {
          const { data: newEntry, error } = await EntryProvider.createEntry({
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
        body: EntryInsertSchema,
        response: { 201: t.Object({ id: t.String() }), 500: t.Object({}) },
      },
    )
    .get(
      "/",
      async ({ user, set }) => {
        try {
          const unsafeUserEntries = await EntryProvider.getEntriesListByUserId(
            user.id,
          );

          const notDeletedEntryList = unsafeUserEntries.filter((entry) => {
            const { entry: notDeletedEntry } = EntryAdapter.toNotDeleted(entry);

            if (!notDeletedEntry) {
              return false;
            }

            return true;
          });

          const safeEntries = notDeletedEntryList.map((entry) => {
            const { safeEntry } = EntryAdapter.toSafeEntry(entry);

            return safeEntry;
          });

          set.status = "OK";
          return safeEntries;
        } catch (e) {
          console.log({ e });
          return error("Internal Server Error", {});
        }
      },
      {
        response: {
          200: t.Array(EntrySafeSchema),
          500: t.Object({}),
        },
      },
    )
    .get(
      "/:id",
      async ({ user, error, set, params }) => {
        try {
          const entry = await EntryProvider.getPrivateEntryById({
            entryId: params.id,
            userId: user.id,
          });

          if (!entry) {
            return error("Not Found", {});
          }

          const { entry: notDeletedEntry } = EntryAdapter.toNotDeleted(entry);

          if (!notDeletedEntry) {
            throw new Error("Entry Deleted");
          }

          const { safeEntry } = EntryAdapter.toSafeEntry(notDeletedEntry);

          set.status = "OK";
          return safeEntry;
        } catch (e) {
          return error("Not Found", {});
        }
      },
      {
        params: t.Object({ id: t.String() }),
        response: { 200: EntrySafeSchema, 404: t.Object({}) },
      },
    )
    .delete(
      "/:id",
      async ({ params: { id: entryId }, set, user }) => {
        try {
          const { error } = await EntryProvider.deleteEntry({
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
          const { error } = await EntryProvider.updateEntry({
            entryId: id,
            values: body,
          });

          if (error) throw new Error(error);

          set.status = "No Content";
          return {};
        } catch (e) {
          return error("Internal Server Error", {});
        }
      },
      {
        params: t.Object({ id: t.String() }),
        body: EntryInsertSchema,
        response: {
          201: t.Object({}),
          500: t.Object({}),
        },
      },
    ),
);
