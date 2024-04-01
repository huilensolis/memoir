import { isAuthenticated } from "@/shared/middlewares/auth";
import Elysia from "elysia";
import {
  JournalEntryInsertScheme,
  JournalEntryReadSchema,
} from "../models/scheme";

export const JournalEntryRoutes = new Elysia()
  .use(isAuthenticated)
  .post("/", () => {}, { body: JournalEntryInsertScheme })
  .get("/", () => {}, { response: { 200: JournalEntryReadSchema } });
