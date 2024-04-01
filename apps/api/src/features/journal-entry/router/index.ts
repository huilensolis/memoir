import { isAuthenticated } from "@/shared/middlewares/auth";
import Elysia from "elysia";
import {
  JournalEntryInsertSchema,
  JournalEntryReadSchema,
} from "../models/joruanl-entry.models";

export const JournalEntryRoutes = new Elysia()
  .use(isAuthenticated)
  .post("/", () => {}, { body: JournalEntryInsertSchema })
  .get("/", () => {}, { response: { 200: JournalEntryReadSchema } });
